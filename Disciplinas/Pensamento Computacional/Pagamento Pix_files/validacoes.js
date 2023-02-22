function validaBandeira(cartao){
	var bandeira = $('input[name="SiglaBandeira"]:checked').val();

	if((cartao.value && bandeira == "MTR" && !/^5[12345]$/.test(cartao.value.substring(0,2))) ||
	   (cartao.value && bandeira == "DNR" && !/36|38/.test(cartao.value.substring(0,2))) ||
	   (cartao.value && bandeira == "HPR" && !/38|60/.test(cartao.value.substring(0,2))) ||
	   (cartao.value && bandeira == "ELO" && !/^4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|50(9[0-9][0-9][0-9])|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|05([7-9])|06([0-9])|07([0-9])|08([0-9])|4([0-3][0-9]|8[5-9]|9[0-9])|5([0-9][0-9]|3[0-8])|9([0-6][0-9]|7[0-8])|7([0-2][0-9])|541|700|720|727|901)|65165([2-9])|6516([6-7][0-9])|65500([0-9])|6550([0-5][0-9])|655021|65505([6-7])|6516([8-9][0-9])|65170([0-4])/.test(cartao.value.substring(0,6)) ||
	   (cartao.value && bandeira == "VSA" && (cartao.value.substring(0,1) != "4" || /^4011|438935|45(1416|76)|50(4175|6699|67|90[4-7])|63(6297|6368)/.test(cartao.value.substring(0,6)))))){
		 alert("Bandeira incompativel com o número do cartão digitado");
		 apagaNCartao();
	   }
}

function validaForm()
{
	var erCVV  = /^[0-9]{3}$/;
	var erCpf  = /^[0-9]{11}$/;
		
	var chkFPag = $('input[name="SiglaBandeira"]:checked').val();
	
	if (!chkFPag){
		alert("Favor selecionar uma forma de pagamento.");
		return false;
	}

	txtNumero = document.getElementById("txtNumero");
		
	if (txtNumero.value == ""){
		alert("É necessário informar o número do cartão.");
		txtNumero.focus();
		return false;
	}
	
	txtCodSeguranca = document.getElementById("txtCVV");
	
	if(!erCVV.test(txtCodSeguranca.value)){
	   alert("Para o código de seguranção necessários 3 digitos");
	   txtCodSeguranca.focus();
	   return false;
	}
	
	if (txtCodSeguranca.value ==""){
	   alert("É necessário informar o código de segurança do cartão");
	   txtCodSeguranca.focus();
	   return false;
	}

	txtCPF = document.getElementById("txtCPF");
	
	if(!erCpf.test(txtCPF.value)){
	   alert("É necessário informar 11 digitos para o CPF");
	   txtCPF.focus();
	   return false;	
	}	
	
	if (txtCPF.value == ""){
	   alert("É necessário informar o número de cpf do portador");
	   txtCPF.focus();
	   return false;
	}
	
	txtNomImpressoCartao = document.getElementById("txtNome");
	
	if (txtNomImpressoCartao.value == ""){
	   alert("Informe o nome impresso no cartão.");
	   txtNomImpressoCartao.focus();
	   return false;
	}
	

	var chkParc = $('input[name="Parcelas"]:checked').val();
	
	if (!chkParc){
		alert("Favor informar o plano de parcelamento.");
		return false;
	}
	
	return true;
}

function Inteiro()
{
    if ((event.keyCode < '48' || event.keyCode > '57') && (event.keyCode != '8')) 
        event.returnValue=false;

    return;
}

function inArray(vet, item)
{
	for (i=0; i<vet.length; i++)
		if (vet[i] == item) 
			return true;
	return false;
}


function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }
}

function mascaraData( campo, e )
{
	var kC = (document.all) ? event.keyCode : e.keyCode;
	var data = campo.value;
	
	if( kC!=8 && kC!=46 )
	{
		if( data.length==2 )
		{
			campo.value = data += '/';
		}
		
	}
}

function montaGrade(sglCartao)
{

	grade = document.getElementById("parcelas");
	grade.innerHTML = "";
	var qtd = 0;

	if (inArray(vetBandeiraCartao, sglCartao))
	{   
		linha = "<table class='table' style='width:100%; text-align:center; font-family: Verdana; font-size: 11px; font-weight: bold; color: #999;' cellspacing='0px'>";
		linha = linha + "<thead>";
        linha = linha + "<tr>";
        linha = linha + "  <th></th>";
        linha = linha + "  <th>Parcelas</th>";
        linha = linha + "  <th>Valor Bruto</th>";
        linha = linha + "  <th>Juros</th>";
        linha = linha + "  <th>Valor Parcela</th>";
        linha = linha + "  <th>Valor Total</th>";
        linha = linha + "</tr>";
        linha = linha + "</thead>";
		
		parcelamento = eval("parcelamento" + sglCartao);

		for (parc = 0; parc < parcelamento.length; parc++)
		{
			var tipoPag = parcelamento[parc][2];
			var tipoFormPag = document.form.TipoPagamento.value;

			if(tipoPag == (tipoFormPag == "CREDITO" ? "C" : "D")){
				qtdParcelas = eval(parcelamento[parc][0]);
				pctJuros = eval(parcelamento[parc][1]);

				valBruto = valTotal / qtdParcelas;
				valJuros = valBruto * (pctJuros/100) * qtdParcelas;
				valLiquido = valBruto + valJuros;
				novoValTotal = valTotal * ( 1 + ( (pctJuros/100) * qtdParcelas) );
		
				linha = linha + "<tbody>";
				linha = linha + "<tr>";
		
				if (parcPadrao == qtdParcelas)
					linha = linha + "<td style='height: 20px;'><input type='radio' name='Parcelas' value='" + qtdParcelas + "' onClick='parcPadrao=this.value' checked></td>";
				else
					linha = linha + "<td style='height: 20px;'><input type='radio' name='Parcelas' value='" + qtdParcelas + "' onClick='parcPadrao=this.value'></td>";
		
				if (qtdParcelas == 1)
					linha = linha + "<td> &Agrave; vista</td>";
				else
					linha = linha + "<td>" + qtdParcelas + "x</td>";

				linha = linha + "<td>" + formatCurr("R$ ", valBruto) + "</td>";
				linha = linha + "<td>" + formatCurr("R$ ", valJuros) + "</td>";
				linha = linha + "<td>" + formatCurr("R$ ", valLiquido) + "</td>";
				linha = linha + "<td>" + formatCurr("R$ ", novoValTotal) + "</td>";
				linha = linha + "</tr>";
				linha = linha + "</tbody>";
				qtd = qtd + 1;
			}
			
		}
		
	}

	if (qtd == 0)
		linha = "<p style='text-align:center; font-family: Verdana; font-size: 11px; font-weight: bold; color: #F55;'>Não há plano de parcelamento disponível.</p>";
		
	grade.innerHTML = grade.innerHTML + linha + "</table>";
	
}

function formatCurr(moeda,val)
{
	if (val == 0)
		return moeda + "0,00";


	novoVal = (val * 100) + "";

	if (novoVal.indexOf(".") == -1)
		fim = novoVal.length;
	else
		fim = novoVal.indexOf(".");

	round = novoVal.substr(fim+1, 1);

	novoVal = novoVal.substr(0, fim);

 	if (round > 5)
		novoVal = (eval(novoVal) + 1) + "";
	
	while (novoVal.length < 3)
		novoVal = "0" + novoVal;

	novoVal = moeda + novoVal.substr(0, novoVal.length-2) + "," + novoVal.substr(novoVal.length-2);

	return novoVal;
}

function apagaNCartao(){
	document.getElementById('txtNumero').value = "";
		
}