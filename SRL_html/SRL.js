var xel_examples = {
    "spa": [
			"La presidenta de los Estados Unidos tiene mucho poder.",
			"Mohandas Karamchand Gandhi fue el dirigente más destacado del Movimiento de independencia de la India contra el Raj británico, para lo que practicó la desobediencia civil no violenta, además de pacifista, político, pensador y abogado hinduista indio.",
        	"Sigmund Freud fue un neurólogo austriaco y fundador del psicoanálisis, un método clínico para tratar la psicopatología a través del diálogo entre un paciente y un psicoanalista. Freud nació de padres judíos gallegos en la ciudad morava de Freiberg, en el Imperio austríaco. Se graduó como doctor en medicina en 1881 en la Universidad de Viena. Freud vivió y trabajó en Viena, donde estableció su práctica clínica en 1886. En 1938, Freud dejó Austria para escapar de la persecución nazi.",
			"Barack Hussein Obama II es un político y abogado estadounidense que se desempeñó como el 44º presidente de los Estados Unidos de 2009 a 2017. Miembro del Partido Demócrata, Obama fue el primer presidente afroamericano de los Estados Unidos. Anteriormente se desempeñó como senador de Estados Unidos por Illinois de 2005 a 2008 y como senador del estado de Illinois de 1997 a 2004. ",
			"Mohandas Karamchand Gandhi fue un abogado indio, nacionalista anticolonial y especialista en ética política, que empleó la resistencia no violenta para liderar la exitosa campaña por la independencia de la India del dominio británico y, a su vez, inspiró movimientos por los derechos civiles y la libertad en todo el mundo. El Mahātmā honorífico, que se le aplicó por primera vez en 1914 en Sudáfrica, ahora se usa en todo el mundo."
    ]
}

function fillExampleSelectField() {
	hideResult();
	lang="spa";
	// alert("examples...");
	$("#example").empty();
	selectField = document.getElementById("example");
	textField = document.getElementById("text");
	idx = 0;
	for (var example in xel_examples[lang]) {
		var opt = document.createElement("option");
		opt.value=idx;
		opt.innerHTML = xel_examples[lang][idx].substring(0,50)+"..."; 
		selectField.appendChild(opt);
		idx += 1;
	}	
	selectField.value = "0";
	textField.value = xel_examples[lang][0];
}

function newExampleSelect() {
	hideResult();
	// langSelectField = document.getElementById("lang");
	lang = "spa"; // langSelectField.value;
	exampleSelectField = document.getElementById("example");
	example = exampleSelectField.value;
	textField = document.getElementById("text");
	// textField.value = xel_langs[languageSelected]["text"]; 
	textField.value = xel_examples[lang][example]; 
}

function getSelectedAnnotators() {
	var selectedAnnotators = [];
	var annotator_buttons = document.getElementsByClassName('annotator');
	for(var i = 0; i<annotator_buttons.length;i++)
	{
		var ann_button = annotator_buttons[i];
		//console.log(checkbox_button);
		if(ann_button.checked) {
			//alert(ann_button.id);
			var text_of_button = ann_button.id;
			//console.log(text_of_button);
			selectedAnnotators.push(text_of_button);
		}
	}
	return selectedAnnotators;
}

function hideResult() {
	$("#result").hide();
	$("#result").html("");
}

function showResult() {
	$("#result").show();
}

/*
async function httpPOST(url = '', data = {}, pfunction) {
  console.log(url);
  console.log(JSON.stringify(data));
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
	cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
        .then(json => {
                pfunction(json);
        });
}
*/

async function postInput(url = '', data = {}) {
	const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'no-cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'omit', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
       // 'Accept': 'application/json, text/plaini, */*'
      //'Content-Type': 'application/json'
        //,'Data-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    //body: data
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function formSubmit() {
	hideResult();
	$("#result").html("Working...");
	showResult();
	anns = getSelectedAnnotators();
	text = document.getElementById("text").value;
	data = {
		"text": text,
		"anns": anns
	};
	url = "view";
	postInput(url, data)
		.then(data => {
			// console.log(data);
			$("#result").html(data.html);
			showResult();
    });
	// $("#result").html(anns.join(","));
	// showResult();
	return false;
}

function showSenseFrameVerb(predicate,senseNumber)
{
	$("#senseFrame").show();
	// $("#senseFrameBody").html("<h1>"+predicate+":"+senseNumber+"</h1>");

	data = {
		"predicate": predicate,
		"senseNumber": senseNumber
	};
	url = "verbSenseFrame";
	postInput(url, data)
		.then(data => {
			// console.log(data);
			$("#senseFrameBody").html(data.html);
			// showResult();
    });

	return false;
}

function showSenseFrameNom(predicate,senseNumber)
{
	$("#senseFrame").show();
	// $("#senseFrameBody").html("<h1>"+predicate+":"+senseNumber+"</h1>");

	data = {
		"predicate": predicate,
		"senseNumber": senseNumber
	};
	url = "nomSenseFrame";
	postInput(url, data)
		.then(data => {
			// console.log(data);
			$("#senseFrameBody").html(data.html);
			// showResult();
    });

	return false;
}

function hideSenseFrame()
{
	// document.getElementById('id01').style.display='none';
	$("#senseFrame").hide();
	$("#senseFrameBody").html("<p>Loading frame content...</p>");
	return false;
}

function main() {
	fillExampleSelectField();
}


