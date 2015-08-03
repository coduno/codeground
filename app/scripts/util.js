var BASE_URL = "http://localhost:8080";

if (location.origin.indexOf("localhost") == -1) {
  BASE_URL = "https://api.cod.uno";
}

function get(ajaxRequest, route, authorization, responseCallback){
  ajaxRequest.url = BASE_URL + route;
  ajaxRequest.method = "GET";
  if (authorization){
    ajaxRequest.headers = {"Authorization": authorization};
  }
  else{
    ajaxRequest.headers = {"Authorization": localStorage.getItem("authorization")};
  }
  ajaxRequest.generateRequest();
}

function post(ajaxRequest, route, body){
  ajaxRequest.url = BASE_URL + route;
  ajaxRequest.method = "POST";
  ajaxRequest.headers = {"Authorization": localStorage.getItem("authorization")};
  ajaxRequest.body = JSON.stringify(body);
  ajaxRequest.generateRequest();
}
function getLanguagesForTags(tags){
  var langs = [];
  for(var i=0;i<tags.length;i++){
    langs.push(getLanguageForTag(tags[i]));
  }
  return langs;
}

function getLanguageForTag(tag){
  var lang = {tag: tag}
  switch(tag){
    case "c":
      lang.name = "C";
      break;
    case "cpp":
      lang.name = "C++";
      break;
    case "java":
      lang.name = "Java";
      break;
    case "py":
      lang.name = "Python";
      break;
    default:
      lang.name = "Undefined";
      break;
  }
  return lang;
}


function put(ajaxRequest, route, body){
  ajaxRequest.url = BASE_URL + route;
  ajaxRequest.method = "PUT";
  ajaxRequest.headers = {"Authorization": localStorage.getItem("authorization")};
  ajaxRequest.body = JSON.stringify(body);
  ajaxRequest.generateRequest();
}

(function(){
  var initialError;

  function handleError(error){
    initialError = error;
    switch(error.detail.request.xhr.status){
      case 500: {
        page.redirect('/500');
        break;
      }
      case 401:{
        page.redirect('/login');
        break;
      }
      case 404:{
        //todo: create page for 404
        page.redirect('/404');
        break;
      }
    }
  }

  function getLastError(){
    return initialError;
  }

  window.getLastError = getLastError;
  window.handleError = handleError;
})();
