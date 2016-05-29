import {Component, Input} from "angular2/core";
import {DisplayTag} from "../../entities/DisplayTag";
import {Place} from "../../entities/place";
import {LikeService} from "../../../services/likeService";

@Component({
  selector: 'tag',
  templateUrl: 'app/components/tagsComponent/tagDisplay/tagDisplay.html',
  //styleUrls: ['app/component/tagsComponent/tagDisplay/tagDisplay.css']
})
export class TagDisplay{
  @Input()
  tag: DisplayTag;
  @Input()
  place:Place;
  constructor(
    private  _likeService:LikeService
  ){}

  likeTag(){
    this._likeService.addLike(this.place, this.tag.tag)
      .then(()=>window.location.reload());
    // window.location.reload();
      // .then(
      //   ()=>{
      //     this._likeService.getDisplayTag(this.place, this.tag.tag);
      //   })
      // .then(tag=>{
      //   console.log(tag);
      //   this.tag=DisplayTag(this.tag.tag, tag.data.length);
      //   console.log("displayTag:");
      //   console.log(this.tag);
      // });
  }

}

