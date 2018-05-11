(function (global, factory) {
	typeof exports === 'object' &&
	typeof module !== 'undefined' ? factory(exports) :
			typeof define === 'function' &&
			define.amd ? define(['exports'], factory) :
				(factory( (global.Hawk = global.Hawk || {}) ));
}(this, (function (exports) { 'use strict';

var domElement;
var scene, camera, renderer;
var logger;

exports.Game = Game;
exports.Actor = Actor;

function Actor(form) {
	this.mesh;
	if(form && form instanceof THREE.Mesh) {
		this.mesh = form;
	} else {
		this.mesh = createBasicForm();
	}
}

function createBasicForm() {
	var geometry = new THREE.ConeGeometry( 2, 5, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var cone = new THREE.Mesh( geometry, material );
	return cone;
}

function isHTMLElement(element) {
	return (element && HTMLElement && element instanceof HTMLElement);
}

function Game(domElem, logs) {
	if(isHTMLElement(domElem)) {
		domElement = domElem;
	} else {
		let body = document.getElementsByTagName("body")[0];
		domElement = document.createElement("div");
		body.append(domElement);
	}
	logger = logs || function() { console.log("False"); };

	initScene();
	// initSkybox();
	initTerrain();

	var fieldOfView = 80,
			aspectRatio = window.innerWidth / window.innerHeight,
			nearPlane = 0.1,
			farPlane = 1500;
		camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, nearPlane, farPlane );

		camera.position.set(0,20,20);
		camera.lookAt(scene.position);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio);
		renderer.shadowMap.enabled = true;

		domElement.appendChild( renderer.domElement ); // Append the 3D scene in the page

		var controls = new THREE.OrbitControls( camera, renderer.domElement );

		animate();
}

Game.prototype.addInScene = function(object, position) {
	scene.add(object.mesh);
	object.mesh.position.set(position.x, position.y, position.z);
}

function initScene() {
	scene = new THREE.Scene();

	var light = new THREE.PointLight( 0xFFFFFF, 1, 0, 2 );
	var ambientlight = new THREE.AmbientLight( 0x202020 );
	scene.add(light);
	light.position.set(0,10,0);
	scene.add(ambientlight);
	logger("Scene initialized");
}

function initSkybox() {
	var skyboxPath = "";
	var skyboxFormat = ".png";

	var skyboxTextures = [
		skyboxPath + 'right' + skyboxFormat,
			skyboxPath + 'left' + skyboxFormat,
			skyboxPath + 'top' + skyboxFormat,
			skyboxPath + 'bottom' + skyboxFormat,
			skyboxPath + 'front' + skyboxFormat,
			skyboxPath + 'back' + skyboxFormat
	];

	var skybox = new THREE.CubeTextureLoader().load(skyboxTextures);
	skybox.format = THREE.RGBFormat;

	scene.background = skybox;
	logger("Skybox initialized");
}

function initTerrain() {
	var geometry = new THREE.BoxGeometry( 100, 1, 100 );
	var material = new THREE.MeshBasicMaterial( {color: 0x086910} );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	logger("Terrain initialized");
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

})));
