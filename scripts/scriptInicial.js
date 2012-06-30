//Carregando o painei ao iniciar a página
window.onload = function (){
	//método de ordenação = mo
	
	EXECUTANDO_ORDENACAO = false;
	metodoOrdenacao = queryString('mo');
	
	configTela(metodoOrdenacao);
	
	//Defindo no selectbox o método de ordenação
	$('Sort').value = metodoOrdenacao;
	
	backupColunas = [];
	
	//Adicionando linhas
	//AdicionarColunas();
}


function AdicionarColunas(){
	PAnime.addRetangulo(9);
	PAnime.addRetangulo(10);
	PAnime.addRetangulo(2);
	PAnime.addRetangulo(5);
}

function StopPlay(){
    if(EXECUTANDO_ORDENACAO){
        stop() 
        EXECUTANDO_ORDENACAO =  false;
    } 
    else {
        play(); 
        EXECUTANDO_ORDENACAO = true;
        
    }

}

function adicionarlinha(valor){
    if(PCodigo != null){
        backupColunas.push(valor);
        PAnime.addRetangulo(valor);
    }
}

function restaurar(){
    PAnime.removeRetangulos();
    for(i=0; i < backupColunas.length;i++){
        PAnime.addRetangulo(backupColunas[i]);
    }
}

function stop(){
    PAnime.stop();
    PCodigo.stop();
}

function play(){
    PAnime.play();
    PCodigo.play();
}

function queryString(chave) {
	var url = window.location.href
	
	url = url.substring(url.search('#')+1)
		//o split retorna um vetor de palavras separadas pelo &
		var dicionario = url.split("&");
		for (i=0;i<dicionario.length;i++) {
			var ft = dicionario[i].split("=");
			if (ft[0] == chave) {
				return ft[1];
		}
	}
}

function RestaurarColunas(){
	
	PAnime.restaurarColunas(); 
	$('divtexto').innerHTML=''; 
	
	PCodigo.colorirLinha(1);
	PCodigo.descolLinha(1);
}

function configTela(metodo){
var ALTURA_PAINEIS = 400
var LARGURA_PAINEL_ANIME = 600
var LARGURA_PAINEL_CODIGO = 300
var LARGURA_PAINEL_ARVORE = 200
	if(metodo == 'insert'){
		$("celulaArvore").style.display = 'none';
		$("Td3").innerHTML = '';
	}
	else if(metodo == 'merge' || metodo == 'quick'){
		LARGURA_PAINEL_ANIME = 450
		LARGURA_PAINEL_CODIGO = 250
		LARGURA_PAINEL_ARVORE = 500
	
		try{
			if(PAnime)
				PAnime.larguraPainel = 450
		}
		catch(err){ }
	
		$("celulaArvore").style.display = 'block';
		$("Td3").innerHTML = 'Arvore de recursão';
	}
	else if(metodo == 'heap'){
		LARGURA_PAINEL_ANIME = 450
		LARGURA_PAINEL_CODIGO = 250
		LARGURA_PAINEL_ARVORE = 500
		try{
			if(PAnime)
				PAnime.larguraPainel = 450
		}
		catch(err){	}
		$("celulaArvore").style.display = 'block';
		$("Td3").innerHTML = 'Árvore binária com Heap';
	}
	
	if($('canvas-uuid-1')){
		var c = $('canvas-uuid-1')
		c.width = LARGURA_PAINEL_ANIME
		c.parentNode.style.width = LARGURA_PAINEL_ANIME+'px'
	}
	else
		PAnime = new PainelAnime($("celulaAnime"),LARGURA_PAINEL_ANIME,ALTURA_PAINEIS)
	
	if($('canvas-uuid-2')){
		var c = $('canvas-uuid-2')
		c.width = LARGURA_PAINEL_CODIGO
		c.parentNode.style.width = LARGURA_PAINEL_CODIGO+'px'
	}
	else
		PCodigo = new PainelCodigo($("celulatexto"),LARGURA_PAINEL_CODIGO,ALTURA_PAINEIS)
		
	if($('canvas-uuid-3')){
		var c = $('canvas-uuid-3')
		c.width = LARGURA_PAINEL_ARVORE
		c.parentNode.style.width = LARGURA_PAINEL_ARVORE+'px'
	}
	else
		PArvore = new PainelArvoreBinaria($("celulaArvore"),LARGURA_PAINEL_ARVORE,ALTURA_PAINEIS)
	
	if($('canvas-uuid-4')){
		var c = $('canvas-uuid-4')
		c.width = '519px';
		c.parentNode.style.width = '117px';
	}
	else
	    PDebug =  new PainelDebug($("debug"),'519px','117px');
	//Carregando o código
	LoadPCodigo(metodo)	
	
	
}

function Ordenacao(TipoOrdenacao){
	v = PAnime.canvas.childNodes
	if(!ExecucaoEmAndamento()){
	    if(TipoOrdenacao =='insert')
		    InsertSort(v);
	    else if(TipoOrdenacao == 'merge'){
	        B = []
//	    	MergeSort(0,v.length-1)
	    	alert('Animação ainda não disponível!')
	    }
	    else if(TipoOrdenacao == 'quick'){
	    	alert('Animação ainda não disponível!')
	    }
	    else if(TipoOrdenacao == 'heap'){
	    	alert('Animação ainda não disponível!')
	    }
	    else
		    alert('Animação ainda não disponível!')
	}
}


function InsertSort(vetor){ 

	//Espaço colunas
	var EspCol = 28
	
	var duracao = 4000
	var contTime = 0
	var intervaloMovimento = 4000
	//Definindo que a animação está sendo executada
	EXECUTANDO_ORDENACAO = true
	
	if($('audio').checked == true){
	    
		intervaloMovimento = 9000;
		duracao = 8500
		var text = "Elementos: "
		for (var j=0;j< vetor.length;j++){
			text += vetor[j].height+" "
		}
		contTime+=3000
		PAnime.canvas.after(contTime,function (){ comentario("Ordenação pelo método de Inserção")})
		
		contTime += intervaloMovimento
		
		PAnime.canvas.elementos = text
		PAnime.canvas.after(contTime,function (){ comentario(this.elementos)})
		
		contTime+= intervaloMovimento
	}
	
	chaveDeBug = $("chave");
	IDeBug = $("i");
	JDeBug = $("j");

	var VetordeI =  [];
	var VetordeJ =  [];
	
	for (var j=1;j< vetor.length;j++){

        VetordeJ.push(j);
        
		contTime +=500
		vetor[j].after(contTime,function(){
		    this.fill = "red"; PCodigo.colorirLinha(1)
		        
		    }
		)
		contTime +=500
		vetor[j].after(contTime,function(){ this.animateTo('y',-8,200); PCodigo.colorirLinha(2);
            JDeBug.innerHTML = VetordeJ[0];
            VetordeJ.deleteFirst(VetordeJ[0]);
		})
		contTime +=500
		vetor[j].after(contTime,function(){ 
		PCodigo.colorirLinha(3);
		 
	    }
	    )

		var chave = vetor[j]
		//Vetor de elementos que seram comparados com a chave
		chave.heightCompare = []

		i = j-1

        VetordeI.push(i);
        
		chave.heightCompare.push(vetor[i].height)
//		chave.visibility = ""
		
		contTime +=800
	
		chave.after(contTime, function(){
			if(this.heightCompare.length>0){
				comentario(concat("Verificando se "+this.heightCompare[0]+" é maior que "+this.height));
				chaveDeBug.innerHTML = this.height;
				this.heightCompare.deleteFirst(this.heightCompare[0])
				PCodigo.colorirLinha(4);
			}
			if(VetordeI[0]!='undefined'){
        		IDeBug.innerHTML = VetordeI[0];
		        VetordeI.deleteFirst(VetordeI[0]);
	        }
		})

		while(i>=0 && Number(vetor[i].height) > Number(chave.height)){
            
            if((i+1)<j){
			    chave.heightCompare.push(vetor[i])
			    
			    contTime +=400
			    
			    //vetor[i].after(contTime,function () {	this.heightCompare[0].animateTo('y',-8,200)})

   			    contTime +=intervaloMovimento
    		
			    chave.after(contTime,function(){
				    if(this.heightCompare.length>0){
				    
					    comentario(concat("Verificando se "+this.heightCompare[0].height+" é maior que "+this.height));
					    this.heightCompare.deleteFirst(this.heightCompare[0])
					    PCodigo.colorirLinha(4);
                        //Debug
					    //IDeBug.innerHTML = VetordeI[0];
				    }
			    })
			}
			contTime += intervaloMovimento

			vetor[i].cordX.push((i+1)*EspCol)
			texto = "Condição é verdadeira, troco a posicao do "+vetor[i].height
			vetor[i].after(contTime,function(){
				if(this.cordX.length>0){
					this.animateTo("x",this.cordX[0],duracao);
					
					this.cordX.deleteFirst(this.cordX[0])
					comentario(concat("Condição é verdadeira, o "+this.height +" vai para a direita."))
					PCodigo.colorirLinha(5)
//    			   this.animateTo('y',0,1000);
//					this.visibility = "none"
				}
			})
			
			contTime+=800
			
		    vetor[i].after(contTime,function () {	this.heightCompare[0].animateTo('y',0,200)})
			
			vetor[i+1] = vetor[i]
			
			contTime+=500
			
			vetor[i].after(contTime,function(){
			    PCodigo.colorirLinha(6);
			    if(VetordeI[0]!='undefined'){
        	    	IDeBug.innerHTML = VetordeI[0];
		            VetordeI.deleteFirst(VetordeI[0]);
		        }
			}
			)
			i-=1
			
			VetordeI.push(i);
		}
		
		contTime += intervaloMovimento
		
		vetor[i+1] = chave
		
		vetor[i+1].cordX.push((i+1)*EspCol)
		vetor[i+1].after(contTime,function(){
			if(this.cordX.length>0){
				comentario(concat("Agora insiro o "+this.height+" na posicão alocada."))	
				this.animateTo("x",this.cordX[0],duracao);
				this.cordX.deleteFirst(this.cordX[0])
				
				PCodigo.colorirLinha(7)
			}
		})
		
		contTime += intervaloMovimento
		
		vetor[i+1].after(contTime+200,function(){this.fill = "green" })
		
		vetor[i+1].after(contTime+200,function(){this.animateTo('y',0,200);comentario('');
		})
	}
	//Último evento a ser gerado, e define false para 
	PAnime.canvas.after(contTime+200, function(){	EXECUTANDO_ORDENACAO = false;PCodigo.descolLinha(7)})
}

function MergeSort(e,d){

		if(e<d){
			meio = parseInt((e+d)/2)
			MergeSort(e,meio)
			MergeSort(meio+1,d)
			Merge(e,meio,d)
		}

}

function Merge(p, q, r){
    i = p
    j = q+1
    k = p
    num_elementos = r - p + 1
    //#Combina os itens do vetor v, no vetor auxiliar B
    while(i<=q && j<=r){
        if(v[i].height <= v[j].height){
            B[k]=v[i]
            i+=1
        }
        else{
            B[k]=v[j]
            j+=1
		}
        k +=1
	}
    while(i<=q){
        B[k]=v[i]
        i += 1
        k += 1
    }
    while(j<=r){
        B[k]=v[j]
        j += 1
        k +=1
	}
    for(i in num_elementos){
        v[r]= B[r]
        r-=1
	}
	
}

function GetSpeech(texto)
{
	
var framehtml="<iframe src=\"http://translate.google.com/translate_tts?tl=pt&q=";
			framehtml+=texto
			framehtml+="\" </iframe>";
	document.getElementById("frameaudio").innerHTML=framehtml;

}


function LoadPCodigo(metodo){
	
	if(ExecucaoEmAndamento())
		return
	
	if(PCodigo.PosicaoUltimaLinha != 0)
	    PCodigo.removeLinhas()

	if(metodo == 'insert'){
		PCodigo.addLinha(" INSERTION_SORT(A,size)")
		PCodigo.addLinha("     for j <-- 2 to size do")
		PCodigo.addLinha("           key <-- A[j]")
		PCodigo.addLinha("           i <-- j–1")
		PCodigo.addLinha("           while i>0 and A[i]>key do")
		PCodigo.addLinha("  	           A[i+1] <-- A[i]")
		PCodigo.addLinha("  	           i <-- i–1")
		PCodigo.addLinha("           A[i+1] <-- key")
		
    }
    else if(metodo == 'merge'){
    
        PCodigo.addLinha(" MergeSort (e,d)")
        PCodigo.addLinha("	    if (e < d )")
	    PCodigo.addLinha("	    meio = (e+d)/2;")
	    PCodigo.addLinha("	    MergeSort (e, meio);")
	    PCodigo.addLinha("	    MergeSort (meio+1, d);")
	    PCodigo.addLinha("	    Merge (e, meio, d);")
        PCodigo.addLinha("             ")
        PCodigo.addLinha(" Merge (e, m, d)")
        PCodigo.addLinha("        i = e; j = m+1; k = e;")
        PCodigo.addLinha("        while (i < m) && (j < d) do ")
        PCodigo.addLinha("            if  (A [i] < A[j])")
        PCodigo.addLinha("                B [k] = A [i];")
        PCodigo.addLinha("                k++; i++; ")
        PCodigo.addLinha("            else ")
        PCodigo.addLinha("                B [k] = A [j];")
        PCodigo.addLinha("                k++; j++; ")
        PCodigo.addLinha("	    while (i < m) do ")
        PCodigo.addLinha("    		B [k] = A [i];")
        PCodigo.addLinha("            k++; i++;")
        PCodigo.addLinha("	    while (j < d) do {")
        PCodigo.addLinha("    	    B [k] = A [j];")
        PCodigo.addLinha(" 		    k++; j++;")
        PCodigo.addLinha("	    for (i = 0; i < d; i++) ")
        PCodigo.addLinha("		    A [i] = B [i];")
                	
    }
    else if(metodo == 'quick'){
    
		PCodigo.addLinha("	Quick_sort(vetor,esq, dir):")
		PCodigo.addLinha("      indice = Partition(vetor, esq, dir);")
		PCodigo.addLinha("      if (esq < indice - 1)")
		PCodigo.addLinha("          Quick_sort(vetor, esq, indice -1);")
		PCodigo.addLinha("      if (indice < dir)")
		PCodigo.addLinha("          Quick_sort(vetor, indice, dir);")


		PCodigo.addLinha(" Partition(vetor, esq, dir):")
		PCodigo.addLinha("	     i = esq; j = dir")
		PCodigo.addLinha("	     pivot = vetor[esq]")
		PCodigo.addLinha("	     while (i <= j):")
		PCodigo.addLinha("		     while (vetor[i] < pivot and i<=dir):")
		PCodigo.addLinha("		         i+=1")
		PCodigo.addLinha("		     while (vetor[j] > pivot and j>=esq):")
		PCodigo.addLinha("		         j-=1")
		PCodigo.addLinha("		     if (i <= j):")
		PCodigo.addLinha("		         tmp = vetor[i]")
		PCodigo.addLinha("		         vetor[i] = vetor[j]")
		PCodigo.addLinha("		         vetor[j] = tmp")
		PCodigo.addLinha("		         i+=1")
		PCodigo.addLinha("		         j-=1")
		PCodigo.addLinha("  return i;")
    }
}

