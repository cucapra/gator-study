import CodeMirror from 'codemirror';

export function setup() {
    var cm = CodeMirror(document.getElementById("editor"), {
      value: "precision mediump float;\n\nvarying vec3 normalInterp;\nvarying vec3 vertPos;\n\nuniform int mode;\nconst vec3 lightPos = vec3(1.0,1.0,1.0);\nconst vec3 ambientColor = vec3(0.3, 0.0, 0.0);\nconst vec3 diffuseColor = vec3(0.5, 0.0, 0.0);\nconst vec3 specColor = vec3(1.0, 1.0, 1.0);\n\nvoid main() {\nvec3 normal = normalize(normalInterp);\nvec3 lightDir = normalize(lightPos - vertPos);\nvec3 reflectDir = reflect(-lightDir, normal);\nvec3 viewDir = normalize(-vertPos);\n\nfloat lambertian = max(dot(lightDir,normal), 0.0);\nfloat specular = 0.0;\nif(lambertian > 0.0) {\nfloat specAngle = max(dot(reflectDir, viewDir), 0.0);\nspecular = pow(specAngle, 4.0);\n}\n\ngl_FragColor = vec4(ambientColor +\nlambertian*diffuseColor +\nspecular*specColor, 1.0);\n// only ambient\nif(mode == 2) gl_FragColor = vec4(ambientColor, 1.0);\n// only diffuse\nif(mode == 3) gl_FragColor = vec4(lambertian*diffuseColor, 1.0);\n// only specular\nif(mode == 4) gl_FragColor = vec4(specular*specColor, 1.0);\n}",
      mode: "javascript",
      indentUnit: 4,
      lineNumbers: true,
      lineWrapping: true
    });
  
    document.getElementById("editor").style.height = "89vh";
  
        
        // $('.marked-text').tooltip({
        //     title: 'This is a return statement',
        //     container: 'body',
        //     delay: { "show": 500, "hide": 100 },
        //     animation: false
        // });
  
}
