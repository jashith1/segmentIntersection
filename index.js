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

let t = 0;

animate();

function animate() {
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
	const M = {
		x: lerp(A.x, B.x, t),
		y: lerp(A.y, B.y, t),
	};

	const N = {
		x: lerp(C.x, D.x, t),
		y: lerp(C.y, D.y, t),
	};
	draw(M, 'M');
	draw(N, 'N');
	t += 0.005;
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
