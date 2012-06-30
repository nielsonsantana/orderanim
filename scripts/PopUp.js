// JScript File

function $(id){
	return document.getElementById(id);
}

function AbrirBanner()
{
    if($('divbanner')!=null){
        $('divbanner').style.display = 'block';
    }
    else{
        var div = document.createElement("div");
        div.setAttribute('id','divbanner');
        div.setAttribute('class','divbanner');
        div.style.display = 'block';
        div.setAttribute('onclick','fecharmodal();');
        document.body.appendChild(div);
    }
    
    document.body.setAttribute('onkeypress','keyPressHandler(event);');
    
    return 'divbanner';
}

function Ativdiv(div){
    div.style.display = 'block';
}
function DesDiv(div){
    div.style.display = 'none';
}

document.fecharmodal = function()
{
    if($('divmodal')!= null && $("divbanner") !=null){
        DesDiv($('divbanner'));
        DesDiv($('divmodal'));
    }
}

function fecharmodal()
{
   if($('divmodal')!=null){
	 	document.body.removeChild($('divmodal'))
	 	document.body.removeChild($('divbanner'))
	}
		
/*    if($('divmodal')!= null && $("divbanner") !=null){
        DesDiv($('divbanner'));
        DesDiv($('divmodal'));
    }*/
}

function crateEl(tag){
    return  document.createElement(tag);
}

function AtivarPopUp(){
    AbrirBanner();
    Ativdiv($("divmodal"));
}

function DefinirTitulo(){
    if($("SpanTitulo").innerHTML ==  "")
        $("SpanTitulo").innerHTML = $("iframeconteudo").contentDocument.title;
}

function ModalTamanho(divM,largura,altura){
    if(!isNaN(largura) || !isNaN(altura))
        if(largura != null && altura != null){
            divM.setAttribute('style','width:'+largura+'px ; height:'+altura+'px ; display:none;');
            return;
        }
        divM.setAttribute('style','display:none;');
            
}

//Montar janela frame
function AbrirPopUp(urlIframe,titulo,largura,altura)
{
	fecharmodal()
   /*
   if($("LastURLOpened") != null){
        
        if($("LastURLOpened").value == urlIframe){
            ModalTamanho($('divmodal'),largura,altura);
            AtivarPopUp();
            $("SpanTitulo").innerHTML = titulo;
            return false;
        }
   }
   
   if($('divmodal') != null){
        
        $('divbanner').style.display = 'block';
        
        ModalTamanho($('divmodal'),largura,altura);
        
        ifr = $('iframeconteudo');
        ifr.src = urlIframe;
        $("LastURLOpened").value = urlIframe;
        return false;
   }*/
   
    //var imagload = crateEl('img');
    var hidden = crateEl("Hidden");
    var divLoadImag = crateEl("div");
    var iframe = crateEl('iframe');
    var divT  = crateEl("div");
    var divC = crateEl("div");
    var divM = crateEl("div");
    var dimg = crateEl("div");
    var dtitulo = crateEl("div");
    var divFooder = crateEl("div"); 
    var text = crateEl('span');
    var sptitulo = crateEl('span');
    var img = crateEl('input');

    //add the ids
    hidden.id = "LastURLOpened";
    iframe.setAttribute('id','iframeconteudo');
    divC.setAttribute('id','divconteudo');
    divT.setAttribute('id','divtop');
    divM.setAttribute('id','divmodal');
    divLoadImag.setAttribute('id','divImage');
    sptitulo.id = "SpanTitulo";
    
    //add classes style
    divM.setAttribute('class','divmodal');
    divT.setAttribute('class','topoModalPopupPequeno');
    
    //Div Titulo
    dtitulo.setAttribute('style','margin-top: 2px; margin-left: 5px; float:left;');
    sptitulo.innerHTML = titulo;
    //adicionando ao HTML
    dtitulo.appendChild(sptitulo);
    
    //Imagem fechar
    dimg.setAttribute('title', 'Fechar');
    dimg.setAttribute('onclick', 'fecharmodal();');
    dimg.setAttribute('style','margin-top: 3px; margin-right: 5px; float:right;');
    dimg.className = "imgFechar";
    
    //Adicionando ao cabecalho
    divT.appendChild(dtitulo);
    divT.appendChild(dimg);
    
    //divFooder.setAttribute('style', 'margin-left: 22px; bottom:0pt;');
    //text.setAttribute('style','font-size:12px;');
    //text.innerHTML = "Pressione ESC para fechar.";
    //Adicionando ao roda pé o texto Pressione ESC para fechar.
    //divFooder.appendChild(text);
    
    divLoadImag.className="imgLoad";
    
    $(AbrirBanner()).appendChild(divLoadImag);

    iframe.src = urlIframe;
    
    /*if($("LastURLOpened")!=null)
        $("LastURLOpened").value = urlIframe;
    else {
        document.body.appendChild(hidden);
        hidden.value = urlIframe;
    }*/
    
    ModalTamanho(divM,largura,altura);
    
    iframe.setAttribute('onload','Ativdiv($("divmodal")); DefinirTitulo();');
    
    divM.style.display = 'none';

    divM.appendChild(divT);
    divM.appendChild(divC);
    
    //adicinar roda pé
    //divM.appendChild(divFooder);
    
    divC.appendChild(iframe);
    
    document.body.appendChild(divM);
    
    return false;
}
//Carregar html dinamicament
function loadXMLDoc(url,namediv)
{
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
      
    xmlhttp.open("GET",url,false);
    xmlhttp.send(null);
    namediv.innerHTML=xmlhttp.responseText;
}

function keyPressHandler(e) 
{
      var kC  = (window.event) ? event.keyCode : e.keyCode; // MSIE or Firefox?
      var Esc = (window.event) ?   27 : e.DOM_VK_ESCAPE // MSIE : Firefox
      if(kC==Esc){
         fecharmodal();
         }
}

function GridViewRowSelectedPopUp(valorgrid,ControlID)
{
    var txtbox= parent.document.getElementById(ControlID);
    txtbox.value=valorgrid;
    parent.fecharmodal();
}

//Function Limpar tela
function Limpar()
{
    var allselect = document.getElementsByTagName("select");
    var alltext = document.getElementsByTagName("input");
    for (i in alltext)
    {
        if(alltext[i].type == "text")
            alltext[i].value = "";
        else if(alltext[i].type == "checkbox")
            alltext[i].checked = false;
    }
    for (i in allselect)
    {
        allselect[i].selectedIndex = 0;
    }
    
}
