function pipe(x, y, image) {
	this.x = x,
	this.y = y,
	this.width = image.width / 2,
	this.height = image.height,
	this.image = image;
	
    this.draw = function(context) {
		context.drawImage(image, 5, 5, this.width, this.height);
	}
}
