export class Point {

	x:number;
	y:number;
	ref: any;
	path: any;

	constructor(
		x:number,
		y:number,
		ref?:any,
		path?:any
	) {
		this.x = x;
		this.y = y;
		this.ref = ref;
		this.path = path;
	}
}