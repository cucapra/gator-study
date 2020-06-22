//saving code snippes in json?

//saving picture of visualiser? necessary? as if we can 
import fs from 'fs';
// isSorted.js
// var gator = require('./gator_ocaml');

export function Tutorial(type) 
{
    this.init = function () {
        this.tutorialType = type;
        this.textMarker = 0;
    }

    var cm = document.querySelector('.CodeMirror').CodeMirror;
    // console.log(gator.f("type vec4 is float[4];void main() { vec4 color = [1., 0.4, 0.25, 1.];vec4 gl_FragColor = color;})"));

    const slides = {
        0:"precision mediump float;\n\nvarying vec3 normalInterp;\nvarying vec3 vertPos;\n\nuniform int mode;\nconst vec3 lightPos = vec3(1.0,1.0,1.0);\nconst vec3 ambientColor = vec3(0.3, 0.0, 0.0);\nconst vec3 diffuseColor = vec3(0.5, 0.0, 0.0);\nconst vec3 specColor = vec3(1.0, 1.0, 1.0);\n\nvoid main() {\nvec3 normal = normalize(normalInterp);\nvec3 lightDir = normalize(lightPos - vertPos);\nvec3 reflectDir = reflect(-lightDir, normal);\nvec3 viewDir = normalize(-vertPos);\n\nfloat lambertian = max(dot(lightDir,normal), 0.0);\nfloat specular = 0.0;\nif(lambertian > 0.0) {\nfloat specAngle = max(dot(reflectDir, viewDir), 0.0);\nspecular = pow(specAngle, 4.0);\n}\n\ngl_FragColor = vec4(ambientColor +\nlambertian*diffuseColor +\nspecular*specColor, 1.0);\n}",
        1:"precision mediump float;\n\nconst vec3 ambientColor = vec3(0.5, 0.0, 0.0);\n\nvoid main() {\ngl_FragColor = vec4(ambientColor, 1.0);\n}",
        2:"0",
    };

    const tutorialText = {
        0:"welcome to the tutorial, this is a phong model",
        1:"this uses the ambient color",
        2:"this one doesnt work!"
    }

    const titles = {
        0: "Phong Lighting",
        1: "Ambient Color",
        2: "Big Error"
    }

    const markers = {
        0:null,
        1:{
            line: [2,2],
            ch: [11,45]
        },
        2:null,
    };

    const annotations = {
        0:"first one",
        1:"second one",
        2:"third one"
    }

    this.resetCode = function(stepNum)
    {
        if(this.textMarker){
            this.textMarker.clear();
        }

        cm.setValue(slides[stepNum]);
        displayText(stepNum);
        addMarkers(stepNum);
    }

    this.nextStep = function(number)
    {
        if(this.textMarker){
            this.textMarker.clear();
        }

        cm.setValue(slides[number]);
        displayText(number);
        addMarkers(number);
    }

    function displayText(stepNum){
        document.getElementById("title").innerHTML = titles[stepNum];
        document.getElementById("tutorialText").innerHTML = tutorialText[stepNum];
    }

    function addMarkers(stepNum){
        if(markers[stepNum]){
        cm.markText({
            line: markers[stepNum]["line"][0],
            ch: markers[stepNum]["ch"][0]
            }, 
            {
                line: markers[stepNum]["line"][1],
                ch: markers[stepNum]["ch"][1]
            },
            {
            className: 'marked-text',
            css:"background: blue"
        });
    }

    //     $('.marked-text').tooltip({title:annotations[stepNum],
    //         container: 'body',
    //         delay: { "show": 500, "hide": 100 },
    //         animation: false})

    // }
    }

}