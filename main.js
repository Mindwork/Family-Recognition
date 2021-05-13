// https://teachablemachine.withgoogle.com/models/Q6Hu4I-dD/ //
Webcam.set({
    width: 350, height: 300, image_format: 'png', png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach('#camera')
function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    })
}
console.log("ml5 version ", ml5.version);
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Q6Hu4I-dD/model.json", modelLoaded);
function modelLoaded() {
    console.log("modelLoaded");
}
function identify() {
    var img = document.getElementById("captured_img");
    classifier.classify(img, got_result);
}
function got_result(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("result-object").innerHTML = result[0].label;
        document.getElementById("result-accuracy").innerHTML = result[0].confidence.toFixed(3);
    }
}
function upload(input) {
    console.log(input);
    console.log(input.files);
    console.log(input.files[0]);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var data_uri = "";
        reader.onload = function (e) {
            $('#captured_img').attr('src', e.target.result);
             data_uri = e.target.result;}; 
             document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>'; reader.readAsDataURL(input.files[0]);
    }
}