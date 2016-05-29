/**
 * Created by bubble on 19.05.16.
 */
import {Injectable} from "angular2/core";
import {Likes} from "../components/entities/like";
import {DisplayTag} from '../components/entities/DisplayTag';
import * as _ from "lodash";
import Dictionary = _.Dictionary;
import User = __Backendless.User;
import {Tag} from "../components/entities/tag";
import {Place} from "../components/entities/place";
import {TagDisplay} from "../components/tagsComponent/tagDisplay/tagDisplay";
const Backendless = require('backendless');


@Injectable()
export class LikeService {
  like:Likes;

  constructor() {
  }

  // getTag(tag:string): Promise<Tag>{
  //   let query = new Backendless.DataQuery();
  //   query.condition = "name='" + tag + "'";
  //   return Backendless.Persistence.of(Tag).find(query);
  // }

  getDisplayTag(place:Place, tag: Tag) {
    let query = new Backendless.DataQuery();
    query.condition = "place.objectId='" + place.objectId + "' and tag.objectId='" + tag.objectId + "'";
    return Backendless.Persistence.of(Likes).find(query);
      // .then(res=>{
      //   let dispTag = new DisplayTag(tag, res.totalObjects);
      //   console.log("getDisplayTag:");
      //   console.log(dispTag);
      //   return dispTag;
      // });
  }

  getLikedTags(placeID:string) {
    let query = new Backendless.DataQuery();
    query.condition = "place.objectId='" + placeID + "'";
    query.options = { relations: ["tag"] };
    return Backendless.Persistence.of(Likes).find(query).
    then(res => res.data.map((like) => like.tag))
      .then(tags => {
        let displayTags = [];
        let tagsCount = _.groupBy(tags, "objectId");
        for (let key in tagsCount) {
          displayTags.push(new DisplayTag(tagsCount[key][0], tagsCount[key].length))
        }
        return displayTags;
      });
  }

  addLike(place: Place, tag: Tag) {
    console.log("tag in addLike:");
    console.log(tag);
    return Backendless.UserService.getCurrentUser()
      .then(user=>{
        let like = new Likes(place, user, tag);
        return Backendless.Persistence.of(Likes).save(like);
      });
  }

  getTagByName(name: string): Promise<Tag> {
    let query = new Backendless.DataQuery();
    query.condition = "name='" + name + "'";
    return Backendless.Persistence.of(Tag).find(query)
      .then(res=>{
          if(!res.data.length) throw new Error('Tag with such name isn\'t existed');
          return res;
        });
  }

  createNewTag(tagName: string): Promise<Tag> {
    //прийом називається програмування через копання
    return this.getTagByName(tagName)
      .then(
        res=>{
          console.log(res);
          return res.data[0];
        },
        err=>{
          let tag = new Tag();
          tag.name = tagName;
          return Backendless.Persistence.of(Tag).save(tag);}
      );
  }

  likeNewTag(tagName: string, place:Place) {
    return this.createNewTag(tagName)
      .then( tag=> {
        console.log("created tag:");
        console.log(tag);
        this.addLike(place, tag)});
  }

}

