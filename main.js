prediction = "";

Webcam.set({
    width :350,
    height:300,
    image_format :'png',
    png_quality :90
});
camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">';
    });
}

console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/prVly5KJc/model.json', modelLoaded);

function modelLoaded()
{
    console.log("model loaded successfully");
    speak();
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The Prediction is "+ prediction;
    utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results)
{
     if(error)
     {
        console.log(error);
     }
     else
     {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(prediction == "Amazing")
        {
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("qoute").innerHTML = "This Is Looking Amazing!";
        }
        else if(prediction == "Best")
        {
            document.getElementById("result_emoji").innerHTML = "&#128077;";
            document.getElementById("qoute").innerHTML = "All The Best!";
        }
        else(prediction == "Victory")
        {
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("qoute").innerHTML = "That Was A Marvelous Victory!";
        }
     }
}