import jsPDF from "jspdf";

class Pdf {
	constructor() {
		this._type = "Pdf";
		this.myPdf = new jsPDF({
			orientation: "landscape",
			format: [74, 105]
		});
		this.instantiatePDF = this.instantiatePDF.bind(this);
		this.addPageToPDF = this.addPageToPDF.bind(this);
		this.savePDF = this.savePDF.bind(this);
	}

	instantiatePDF() {
		this.myPdf.text("Instaflip", 30, 50);
	}

	addPageToPDF(imgData) {
		this.myPdf.addPage();
		this.myPdf.addImage(imgData, "JPEG", 43, 12, 50, 50);
	}

	savePDF() {
		this.myPdf.save("Instaflip.pdf");
	}
}

export default new Pdf();
