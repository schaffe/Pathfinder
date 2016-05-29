import {Place} from "./place";
import User = __Backendless.User;
import {Tag} from "./tag";
/**
 * Created by bubble on 19.05.16.
 */

export class Likes{
  ___class : string = "Likes";
  objectId : string;

  constructor(
    public place : Place,
    public user : User,
    public tag : Tag
  ){
  }
}
