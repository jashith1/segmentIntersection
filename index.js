const canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const A = {
	x: 100,
	y: 100,
};

const B = {
	x: 700,
	y: 500,
};

const C = {
	x: 100,
	y: 400,
};

const D = {
	x: 400,
	y: 200,
};

const mouse = {
	x: 0,
	y: 0,
};
document.onmousemove = (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
};

animate();

function animate() {
	const radius = 50;
	A.x = mouse.x;
	A.y = mouse.y - radius;
	B.x = mouse.x;
	B.y = mouse.y + radius;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(A.x, A.y);
	ctx.lineTo(B.x, B.y);
	ctx.moveTo(C.x, C.y);
	ctx.lineTo(D.x, D.y);
	ctx.stroke();

	draw(A, 'A');
	draw(B, 'B');
	draw(C, 'C');
	draw(D, 'D');

	const I = getSegmentIntersection(A, B, C, D);
	if (I) draw(I, 'I');
	requestAnimationFrame(animate);
}

function draw(point, label) {
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = 'bold 14px Arial';
	ctx.fillText(label, point.x, point.y);
}

function lerp(A, B, t) {
	return A + (B - A) * t;
}

function getSegmentIntersection(A, B, C, D) {
	const top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
	const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
	if (bottom === 0) return null;
	const t = top / bottom;
	if (t > 1 || t < 0) return null;
	return {
		x: lerp(A.x, B.x, t),
		y: lerp(A.y, B.y, t),
		offset: t,
	};
}

/*
Ax + (Bx-Ax) * t === Cx + (Dx - Cx) * u
Ax - Cx + ((Bx - Ax) * t) === ((Dx - Cx) * u)
(Dx - Cx)(Ay - Cy + (By-Ay) * t) === (Dy - Cy) * (Ax - Cx + ((Bx - Ax) * t))
(Dx - Cx)(Ay - Cy) + (Dx - Cx)(By - Ay)(t) === (Dy - Cy)(Ax - Cx) + (Dy - Cy)(Bx - Ax)(t)
(Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx) === (Dy - Cy)(Bx - Ax)(t) - (Dx - Cx)(By - Ay)(t) 
(Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx) === (t)((Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay))
t = ((Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx))/((Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay))
*/
