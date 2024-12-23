"use client";
import { useEffect, useState } from 'react';
import collisionSpace1 from './../../../../public/data.js';
export default function Page(){
  
 useEffect(() => {
  let collisions=collisionSpace1;
  const canvas = document.querySelector('canvas');
  if (canvas) {
   canvas.width = 1024;
   canvas.height = 576;
   const collisionmap=[];
   for(let i=0;i<collisions.length;i+=70){
    collisionmap.push(collisions.slice(i,i+70));
   }
   const offset={
    x:-145,
    y:-170
  }
   var c=canvas.getContext("2d");
   const image = new Image();
   image.src = "https://i.imgur.com/obXElls.png";
   const playerimg=new Image();
     playerimg.src="https://i.imgur.com/auUzkJx.png";
   class Sprite{
    position: { x: number; y: number; };
    velocity: { x: number; y: number; };
    image: HTMLImageElement;
    constructor(position: { x: number; y: number }, velocity: { x: number; y: number }, image: HTMLImageElement){
     this.position=position;
     this.velocity=velocity;
     this.image=image;
    }
    draw(){
     if(c) c.drawImage(this.image, this.position.x, this.position.y);
    }
   }
   class Boundary{
    static widthTile=48;
    static heighttile=48;
    position: { x: number; y: number; };
    width: number;
    height: number;
    constructor(position: { x: number; y: number }){
     this.position=position;
     this.width=48;
     this.height=48;
    }
    
    draw(){
     if(c){
      c.fillStyle='black';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
     }
    }
   }
   class Player{
      crop: { x: number; y: number; width: number; height: number; };
      position: { x: number; y: number; };
      width: number;
      height: number;
      image: HTMLImageElement;
      constructor(crop:{x:number;y:number;width:number;height:number},position: { x: number; y: number }, image: HTMLImageElement,width:number,height:number){
        this.crop = crop;
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = image;
      }
      draw(){
        if(c) c.drawImage(this.image,this.crop.x,this.crop.y,this.crop.width,this.crop.height, this.position.x, this.position.y,this.width,this.height);
      }
   }
  console.log(collisionmap);
   const boundaries:Boundary[]=[];
   collisionmap.forEach((row, i) => {
    row.forEach((col, j) => {
      if(col===1025) boundaries.push(new Boundary({x:(j*Boundary.widthTile)+offset.x-425,y:(i*Boundary.heighttile)+offset.y-520}));
    });
   }
    );
    console.log(boundaries);
   const background=new Sprite({x:offset.x,y:offset.y},{x:0,y:0},image);
   const keys={
    w: false,
    a: false,
    s: false,
    d: false
  }
  let lastKey = '';
  const player=new Player({x:0,y:0,width:playerimg.width/4,height:playerimg.height},{x:canvas.width/2-playerimg.width/8,y:canvas.height/2-playerimg.height/8+40},playerimg,playerimg.width/2-20,playerimg.height);
  function rectangularCollision(rectangle1:Player,rectangle2:Boundary){
    return rectangle1.position.x+rectangle1.width>=rectangle2.position.x&&rectangle1.position.x<=rectangle2.position.x+rectangle2.width&&rectangle1.position.y<=rectangle2.position.y+rectangle2.height&&
      rectangle1.position.y+rectangle1.height>=rectangle2.position.y;
  }
    function animate(){

      window.requestAnimationFrame(animate)
      if(c&&canvas){
        c.clearRect(0, 0, canvas.width, canvas.height);
       c.scale(4, 4); 
       background.draw();
      
       c.setTransform(1, 0, 0, 1, 0, 0);
      //  boundaries.forEach(boundary => {
      //   boundary.draw();
      //   // if(rectangularCollision(player,boundary)){
      //   //   console.log('collision');
      //   // }
      // });
       
       player.draw();

      }
      
      if(lastKey==='w'&&keys.w) {
        let move=true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if(rectangularCollision(player,{...boundary,position:{
            x:boundary.position.x,
            y:boundary.position.y+5
          }} as Boundary)){
            console.log('collision');
            move=false;
          }        
        }
        if(move){
          background.position.y+=2;
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            boundary.position.y+=8;
          }
        }
      } 
      else if(lastKey==='a'&&keys.a) {
        let move=true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if(rectangularCollision(player,{...boundary,position:{
            x:boundary.position.x+5,
            y:boundary.position.y
          }} as Boundary)){
            console.log('collision');
            move=false;
          }        
        }
        if(move){background.position.x+=2;
        boundaries.forEach(boundary => {
          boundary.position.x+=8;
        });
      }
      }
      else if(lastKey==='s'&&keys.s) {
        let move=true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if(rectangularCollision(player,{...boundary,position:{
            x:boundary.position.x,
            y:boundary.position.y-5
          }} as Boundary)){
            console.log('collision');
            move=false;
          }        
        }
        if(move){
          background.position.y-=2;
        boundaries.forEach(boundary => {
          boundary.position.y-=8;
        });
      }
      }
      else if(lastKey==='d'&&keys.d) {
        let move=true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if(rectangularCollision(player,{...boundary,position:{
            x:boundary.position.x-5,
            y:boundary.position.y
          }} as Boundary)){
            console.log('collision');
            move=false;
          }        
        }
        if(move){background.position.x-=2;
        boundaries.forEach(boundary => {
          boundary.position.x-=8;
        });}
      }
    }
    animate();
    
    window.addEventListener(('keydown'), function(e) {
     switch(e.key){
       case 'w':
        keys.w=true;
        lastKey='w';
        break;
       case 'a':
        keys.a=true;
        lastKey='a';
        break;
       case 's':
        keys.s=true;
        lastKey='s';
        break;
       case 'd':
        keys.d=true;
        lastKey='d';
        break;
     }
    });
    window.addEventListener('keyup', function(e) {
     switch(e.key){
       case 'w':
        keys.w=false;
        break;
       case 'a':
        keys.a=false;
        break;
       case 's':
        keys.s=false;
        break;
       case 'd':
        keys.d=false;
        break;
     }
    });
   }
  }
  , []);
 return(
   <canvas className="border-[2px] border-black"></canvas>
 )
}