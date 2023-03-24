$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "20/12": titulo = "20 de Dezembro de 2022"; mensagem = "<p>Esse foi o dia que nos conhecemos! Ou pelo menos, o dia que nos conhecemos já sabendo que dali pra frente poderiamos ter alguma coisa juntos.</p><p>Você estava em um momento qualquer, é eu mandei solicitação no Instagram, onde tudo começou, conversamos tanto que parecia ser conhecidos a muito anos, passamos muitas horas conversando, você saiu é eu fiquei ansioso para sentir aquela sensação novamente.Você voltou é conversamos mais um pouco.</p><p>E eu estava certo, você é incrível!</p>";break;
            case "6/1": titulo = "06 de Janeiro de 2022"; mensagem = "<p>Foi o primeiro dia que cantamos juntos.<br> Foi o primeiro dia que realmente falamos um para o outro que realmente estávamos apaixonados usado a letra da música sozinha de Caetano Veloso: <br> As vezes no silêncio da noite <br> Eu fico imaginando nós dois <br> Eu fico ali sonhando acordado.<br> Você tinha acabado de cantar ela para mim.❤️</p>";break;
            case "7/1": titulo = "07 de Janeiro de 2022"; mensagem = "<p>Foi o primeiro dia que andamos juntos .<br>Você estava linda, usando um vestido preto com um relogio que tem.<br>Eu estava no culto ao livre da Hebrom, mas combinamos de se ver, onde fiz sua primeira cartinha. marcamos de se encontrar na eletrozema, e chegando lá você estava cheia de sacola, e eu ajudei a levar. passei perto do seu reino hahaha princesinha.❤️</p>";break;
            case "24/1": titulo = "24 de Janeiro de 2022"; mensagem = "<p>Foi o dia que começamos namorar e orar juntos, para o nosso namoro ser abençoado por Deus.<br>Onde tudo começou dar certo, ficamos tão ansiosos esse dia que nem sabemos como começava, mas oramos é ficamos tão alegre quando sentimos a presença do Senhor em nosso relacionamento, como eu amei esse dia!!</p>";break;
            case "28/1": titulo = "28 de Janeiro de 2022"; mensagem = "<p>Foi o dia do nosso primeiro beijinho onde eu estava querendo te beijar, e antes você me beijou isso foi tão incrível para mim, você com o vestido da virada eu com a blusa da virada hahaha.<br>Nosso primeiro beijo teve cara de nosso primeiro encontro, e ainda subimos para a noite de adoração tão felizes de mãos dadas!!</p>";break;
            case "final": titulo = "24 de Março de 2022"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que completamos 3 MESES, é ela disse que me AMA!!<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}
