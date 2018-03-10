import jsPDF from "jspdf";

class Pdf {
	constructor() {
		const options = {
			orientation: "landscape",
			format: [74, 105]
		};
		this._type = "Pdf";
		this.myPdf = new jsPDF();
		this.instantiatePDF = this.instantiatePDF.bind(this);
		this.addPageToPDF = this.addPageToPDF.bind(this);
		this.savePDF = this.savePDF.bind(this);
	}

	instantiatePDF() {
		this.myPdf.text("Instaflip", 30, 50);
	}

	addPageToPDF(imgData, pgNumber) {
		const col = pgNumber % 2 === 0 ? 2 : 1; //1 or 2
		const row = Math.ceil(pgNumber / 2); //1-4
		const printRow = row > 4 ? row - 4 : row;
		if (printRow === 1 && col === 1) {
			this.myPdf.addPage();
		}
		const x = 105 * (col - 1);
		const y = 74 * (printRow - 1);
		console.log(col, row);
		this.myPdf.rect(x, y, 105, 74); //x y is upper left corner, then w, h
		this.myPdf.addImage(imgData, "JPEG", x + 43, y + 12, 50, 50);
	}

	savePDF() {
		this.myPdf.save("Instaflip.pdf");
	}
}

export default new Pdf();
