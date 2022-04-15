let trajet = document.getElementsByClassName("trajet");
let date = document.getElementsByClassName("date");
let depart = document.getElementsByClassName("depart");
let prix = document.getElementsByClassName("prix");


function popup()
{

    let trajets = "";

    for (let i = 0; i < trajet.length; i++){
        trajets += trajet[i].innerHTML + "         " + date[i].innerHTML + "         " + depart[i].innerHTML + "\n"; 
    }
    
    alert("Vous avez réservé le(s) trajet(s) suivant(s) : " +"\n" + trajets)
}

  