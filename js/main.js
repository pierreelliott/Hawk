/**
 * @author Pierre-Elliott Thiboud / http://pierreelliott.github.io/
 *
 */

"use strict";

window.addEventListener("load", function() {
  var container = document.getElementById("gameScene");
  var game = new Hawk.Game(container, console.log);
  var actor = new Hawk.Actor();
  game.addInScene(actor, {x: 0, y: 5, z: 0});
});
