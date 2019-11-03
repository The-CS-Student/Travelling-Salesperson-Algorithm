points = []
orderArr = []
distance = null
index = null
function setup() {
	createCanvas(600, 600);
	button = createButton('Find Path');
  button.position(620, 40);
  button.mousePressed(changeBG);
  slider = createSlider(0, 255, 100);
  slider.position(620, 10);
  slider.style('width', '80px');


}
function inArray(array,i){
	arr = array.split("")
	for(var j =0;j<array.length;j++){
		if(array[j]==i){
			return true
		}
	}
	return false
}
function generateCombinations(order,curString,a,prevArr){
	if(a<=0){
		orderArr.push(curString)
	}
	else{
		for(var i =0;i<order;i++){
			if(inArray(prevArr,i)==false){
				newString = curString+i
				newArray = prevArr+i
				generateCombinations(order,newString,a-1,newArray)
		}
	}
}
}
function distan(x1,y1,x2,y2){


var a = x1 - x2;
var b = y1 - y2;

var c = Math.sqrt( a*a + b*b );
return c
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function findOp(array){

	distances = []

	for(var i = 0;i<array.length;i++){
		patharr = array[i].split("")
		for(var j =0;j<patharr.length;j++){
			patharr[j] = parseInt(patharr[j])
		}
		

		tempD = 0
		for(var j = 0;j<patharr.length-1;j++){
			tempD+=distan(points[patharr[j]].x,points[patharr[j]].y,points[patharr[j+1]].x,points[patharr[j+1]].y)
			await sleep(slider.value())
			points[patharr[j]].neighbours = points[patharr[j+1]]

		}
		distances.push(tempD)
		if(distance==null){
			distance = tempD
			index = i

		}
		else if(distance!=null){
			if(distance>tempD){
				distance = tempD
				index = i
			}
		}

	}
	patharr = array[index].split("")

	for(var j =0;j<patharr.length;j++){
			patharr[j] = parseFloat(patharr[j])
		}

	for(var j = 0;j<patharr.length-1;j++){
	

	points[patharr[j]].neighbours = points[patharr[j+1]]

		}
	console.log(distance)
	
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeBG() {
  generateCombinations(points.length,"",points.length,"")
  findOp(orderArr)
}
function draw() {
	background(0)
	for(var i = 0;i<points.length;i++){
		points[i].show()
	}
	
}
function mousePressed(){
	points.push(new Point(mouseX,mouseY))
}
function Point(x,y){
	this.x = x
	this.y = y
	this.size = 14
	this.neighbours =null
	this.nline = (0,0,255)
	this.show=function(){
		fill(0,255,0)
		ellipse(this.x,this.y,this.size,this.size)
		if(this.neighbours!=null){
		stroke(0,0,255)
		strokeWeight(3)
		line(this.x,this.y,this.neighbours.x,this.neighbours.y)
}
	}
}