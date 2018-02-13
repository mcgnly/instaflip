import jsPDF from "jspdf";

class Pdf {
	constructor() {
		this._type = "Pdf";
		this.myPdf = new jsPDF({
			orientation: "landscape",
			format: [60, 90]
		});
		this.instantiatePDF = this.instantiatePDF.bind(this);
		this.addPageToPDF = this.addPageToPDF.bind(this);
		this.savePDF = this.savePDF.bind(this);
	}

	instantiatePDF() {
		this.myPdf.text("This is the cover!", 30, 65);
	}

	addPageToPDF(imgData) {
		this.myPdf.addPage();
		this.myPdf.addImage(imgData, "JPEG", 10, 10, 50, 50, "monkey");
	}

	savePDF() {
		this.myPdf.save("two-by-four.pdf");
	}
}

export default new Pdf();
