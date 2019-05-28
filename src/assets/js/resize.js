window.resize = (function () {

	'use strict';

	function Resize() {
		//
	}

	Resize.prototype = {

		init: function(outputQuality) {
			this.outputQuality = (outputQuality === 'undefined' ? 0.8 : outputQuality);
		},

		photo: function(file, maxSize, inputType, outputType, callback) {

			let _this = this;

			let reader = new FileReader();
			reader.onload = function (readerEvent) {
				_this.resize(readerEvent.target.result, maxSize, inputType, outputType, callback);
			};
			reader.readAsDataURL(file);

		},

		resize: function(dataURL, maxSize, inputType, outputType, callback) {

			let _this = this;

			let image = new Image();
			image.onload = function (imageEvent) {
				// Resize image
				let canvas = document.createElement('canvas'),
					width = image.width,
					height = image.height;
				if (width > height) {
					if (width > maxSize) {
						height *= maxSize / width;
						width = maxSize;
					}
				} else {
					if (height > maxSize) {
						width *= maxSize / height;
						height = maxSize;
					}
				}
				canvas.width = width;
				canvas.height = height;
				canvas.getContext('2d').drawImage(image, 0, 0, width, height);
				_this.output(canvas, inputType, outputType, callback);

			};
			image.src = dataURL;

		},

		output: function(canvas, inputType, outputType, callback) {

			switch (outputType) {

				case 'file':
					canvas.toBlob(function (blob) {
						callback(blob);
					}, inputType, 0.8);
					break;

				case 'dataURL':
					callback(canvas.toDataURL(inputType, 0.8));
					break;

			}

		}

	};

	return Resize;

}());
