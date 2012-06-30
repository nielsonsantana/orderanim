
//Posta o comentário na divtexto

function comentario(texto){
	if($('audio').checked == true){
		GetSpeech(texto)
	}
	$("divtexto").innerHTML = "<br>"+texto
}

//Aparemente parece não fazer nada, mas essa função tem utilidade
function concat(texto){
	return texto
}


EXECUTANDO_ORDENACAO = false;

function ExecucaoEmAndamento (){
		if(EXECUTANDO_ORDENACAO)
			if(PAnime){
				PAnime.stop()
				// Não pode adicionar, existe uma animação em execução!')
				alert('Operação não pode ser executada. Existe uma animação sendo executada')
				PAnime.play()
			}
			
		return EXECUTANDO_ORDENACAO
}

/*

*/
Painel = Klass({
	//Atributos
	alturaPainel : 0,
	larguraPainel   : 0,
	canvas : null,
	
	initialize : function (){
		if(arguments.length > 2){
			container = arguments[0]
			largura = arguments[1]
			altura = arguments[2]
			this.larguraPainel = largura
			this.alturaPainel = altura
			this.canvas = new Canvas(container,largura,altura)
		}
		//else
			//this.canvas = new Canvas(container, arguments[1][1], arguments[1][0])

	},
	
	stop : function(){ this.canvas.stop()},
	
	play : function(){ this.canvas.play()}
	
	
})

PainelAnime = Klass(Painel,{
	
	//Atributos
	ultimoValorAbscicaX : null,
	beckupColunas : [],
	
	initialize : function () {
		 Painel.initialize.call(this,arguments[0],arguments[1],arguments[2])
	},
	addRetangulo : function(altura){
	
		var erro = false
		
		if(ExecucaoEmAndamento())
	        return

		if(altura == '' || !Number(altura))
			erro = true

		else if(altura >200 )
			erro = true
			
		if(this.ultimoValorAbscicaX > (this.larguraPainel-28)){
			alert('Não é possível adicionar mais colunas!')
			return
		}
		
		if(erro){
			alert('O tamanho da coluna deve ficar entre 1 e 200!')
			return
		}
		
		//Criando um retangulo
		var rect = new Rectangle(20,altura)
		
		rect.fill = 'green'	
		
		rect.cy = this.alturaPainel - altura
		rect.cordX = []
		
		if(this.ultimoValorAbscicaX!=null){
			rect.x = (this.ultimoValorAbscicaX+28)
		}
		//Criando o texto que irá ficar no cabeçalho do retangulo. 
		
		var textnumero = new TextNode(altura,{ font: "15px verdana", fontFamily : "verdana", fontSize: "15px", fillStyle:"green"})
		
		textnumero.cx = rect.cx
		textnumero.cy = rect.cy-4
		
		//Adicionando o texto para o retangulo
		rect.append(textnumero)
		//Adicionando o retangulo ao painel
		this.canvas.append(rect)
		
		this.beckupColunas.push(rect.clone())
		
		this.ultimoValorAbscicaX = rect.x
	},
	
	removeRetangulo : function(){
		if(!ExecucaoEmAndamento()){
		    if(this.canvas.childNodes.length>0){
	 		    this.canvas.childNodes.pop()
	 		    this.ultimoValorAbscicaX -=28
 		    }
 		}
	},
	
	removeRetangulos : function(){
		if(!ExecucaoEmAndamento()){
			this.canvas.removeAllChildren()
			this.ultimoValorAbscicaX = null;
		}
	},
	
	restaurarColunas : function (){
	//TODO:Desenvolver uma rotina para deletar todos os retangulos do painel de animação e 
//	restaurar as colunas com os valores  antes de ordenar
	
	/**		//Remove todas as coisas que existia dentro da canvas
		this.canvas.isPlaying = false
	    for (var i=0; i<this.canvas.childNodes.length; i++){
	    	this.canvas.deleteFirst(this.canvas.childNodes[i])
	    }
			
			EXECUTANDO_ORDENACAO = false
			//Já que removel tudo, será necessário icluir do início
			this.ultimoValorAbscicaX = 0
			this.canvas.removeAllChildren()
			//Restaurando todas as colunas que adicionadas antes de iniciar a ordenação
	    for (var i=0; i<this.beckupColunas.length; i++){
			this.canvas.append(this.beckupColunas[i])
		}
		**/
	},
	
	mouseRetangulo : function(){
	}
	
})

PainelCodigo = Klass(Painel,{
	//Atributos
	PosicaoUltimaLinha : 0,
	
	initialize : function () {
		Painel.initialize.call(this,arguments[0],arguments[1],arguments[2])
	},
	addLinha : function(linha){
		var texto = new TextNode(linha,{font:"15px sun"})
		this.PosicaoUltimaLinha += 16
		texto.y += this.PosicaoUltimaLinha
		texto.fill = 'green'
		this.canvas.append(texto);
	},
	
	addLinhas : function(){
		
	},
	
	removeLinhas : function(){
		if(this.canvas.childNodes != null)
			this.canvas.removeAllChildren()
			this.PosicaoUltimaLinha = 0
	},
	
	colorirLinha : function (indiceLinha){
		for (i=0; i < this.canvas.childNodes.length;i++){
			this.descolLinha(i)
		}

		this.canvas.childNodes[indiceLinha].fill = 'red';
	},
	
	descolLinha : function (indiceLinha){
		this.canvas.childNodes[indiceLinha].fill = 'green'
	}
	
})

PainelDebug = Klass(Painel,{
	initialize : function () {
		Painel.initialize.call(this,arguments[0],arguments[1],arguments[2])
	},
	addVariavel : function (chave,valor){
		//var texto = new TextNode(chave,{font:"15px sun"})
		//this.PosicaoUltimaLinha += 16
		//texto.y += this.PosicaoUltimaLinha
		//texto.fill = 'green'
		//this.canvas.append(texto);
	},
	
	AtualizarVariavel : function (chave,valor) {
	
	},
	
	removeVariavel : function (chave){
	},

	mouseVariavel : function(){
	}
	
})

PainelSchemaRecursao = Klass(Painel,{
	//Atributos
	
	initialize : function () {
		Painel.initialize.call(this,arguments[0],arguments[1],arguments[2])
	},
	addRetangulo : function(){
		
	},
	
	removeRetangulo : function(){
	},

	
})

PainelArvoreBinaria = Klass(Painel,Drawable,{
	//Atributos

	initialize : function () {
		Painel.initialize.call(this,arguments[0],arguments[1],arguments[2])
	},
	
})
