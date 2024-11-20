export function findMinCoords(path: string) {
	const parts = path.split(' ');
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === 'M' || parts[i] === 'L') {
			i++;
			minX = Math.min(minX, +parts[i]);
			maxX = Math.max(maxX, +parts[i]);
			i++;
			minY = Math.min(minY, +parts[i]);
			maxY = Math.max(maxY, +parts[i]);
		} else if (parts[i] === 'Q') {
			i++;
			minX = Math.min(minX, +parts[i]);
			maxX = Math.max(maxX, +parts[i]);
			i++;
			minY = Math.min(minY, +parts[i]);
			maxY = Math.max(maxY, +parts[i]);
			i++;
			minX = Math.min(minX, +parts[i]);
			maxX = Math.max(maxX, +parts[i]);
			i++;
			minY = Math.min(minY, +parts[i]);
			maxY = Math.max(maxY, +parts[i]);
		} else if (parts[i] === 'A') {
			i++;
			minX = Math.min(minX, +parts[i]);
			maxX = Math.max(maxX, +parts[i]);
			i++;
			minY = Math.min(minY, +parts[i]);
			maxY = Math.max(maxY, +parts[i]);
			i += 4;
			minX = Math.min(minX, +parts[i]);
			maxX = Math.max(maxX, +parts[i]);
			i++;
			minY = Math.min(minY, +parts[i]);
			maxY = Math.max(maxY, +parts[i]);
		}
	}
	return [minX, minY, maxX, maxY];
}
