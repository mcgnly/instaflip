import jsPDF from "jspdf";

class Pdf {
	constructor() {
		this.printPg = 0;
		this._type = "Pdf";

		this.makeA4pdf = this.makeA4pdf.bind(this);
		this.makeA7pdf = this.makeA7pdf.bind(this);
		this.instantiatePDF = this.instantiatePDF.bind(this);
		this.addPageToPDFA4 = this.addPageToPDFA4.bind(this);
		this.addPageToPDFA7 = this.addPageToPDFA7.bind(this);
		this.savePDF = this.savePDF.bind(this);
	}
	
	makeA4pdf(){
		this.myPdf = new jsPDF();// no options mean portrait A4
	}
	
	makeA7pdf(){
		const options = {
			orientation: "landscape",
			format: [74, 105]
		};
		this.myPdf = new jsPDF(options);// options mean A7 landscape
	}
	
	instantiatePDF(name) {
		this.myPdf.setFont("courier");
		this.myPdf.text("Instaflip", 42, 40);
		this.myPdf.text("by: " + name, 42, 50);
	}
	
	addPageToPDFA4(imgData, pgNumber) {
		// 2 cols and 4 rows fit on a page
		const col = pgNumber % 2 === 0 ? 2 : 1; //1 or 2
		const row = Math.ceil(pgNumber / 2); //1-4

		const printRow = row - 4 * this.printPg;
		console.log("col", col, "row", row, printRow);
		const x = 105 * (col - 1);
		const y = 74.25 * (printRow - 1);
		this.myPdf.rect(x, y, 105, 74.25); //x y is upper left corner, then w, h
		this.myPdf.text(pgNumber.toString(), x + 10, y + 40);
		this.myPdf.addImage(imgData, "JPEG", x + 43, y + 12, 50, 50);
		if (printRow === 4 && col === 2) {
			this.printPg++;
			this.myPdf.addPage();
			console.log("new page", this.printPg);
		}
	}

	addPageToPDFA7(imgData, pgNumber) {
		// 1 img per page, A7 105x74.25 mm
		this.myPdf.addPage();
		this.myPdf.text(pgNumber.toString(), 10, 40);
		this.myPdf.addImage(imgData, "JPEG", 43, 12, 50, 50);
		// add a blank page so the image is only on one side!
		this.myPdf.addPage();
	}

	savePDF() {
		this.myPdf.save("Instaflip.pdf");
	}

	convertToBlob() {
		return this.myPdf.output("blob");
	}
}

export default new Pdf();
