function populateGabaritoDanteWithCSV($csvFile,$courseNameColumn,$dataColumn,$semesterColumn,$initFirstTemplate){
  $questionValue=1;
  $gabaritoCSV =_readCSVFile($csvFile,';',true);

  for ($i = 1; $i < $gabaritoCSV.length; $i++) {
//botááo adicionar
_click(_submit("voltar"));
//2º semestre de 2014
_setSelected(_select("plet_in_id[1]"), $gabaritoCSV[$i][$semesterColumn]);
//grupo 1
_setSelected(_select("hgru_in_id[1]"), 4);
//buscar disciplina
_setSelected(_select("dis_in_id[1]"),$gabaritoCSV[$i][$courseNameColumn]);
//colocar data conforme planilha
//pegando a data e separando
$date = $gabaritoCSV[$i][$dataColumn];
$dateArray=$date.split("/");

_click(_textbox("dt_aplicacao"));
_setValue(_textbox("dt_aplicacao"), "__/__/"+$dateArray[2]);
_setValue(_textbox("dt_aplicacao"), $dateArray[0]+"/__/"+$dateArray[2]);
_setValue(_textbox("dt_aplicacao"), $dateArray[0]+"/"+$dateArray[1]+"/"+$dateArray[2]);
_wait(2500);
_click(_cell("Gravar"));
_click(_cell("Gravar"));
$dateArray.length=0;
$date ='';

while($questionValue<9)
{
  //gabarito
  $secondIndex = $questionValue+$initFirstTemplate;
  _setValue(_textbox('r'+$questionValue), $gabaritoCSV[$i][$secondIndex]);

//valor de cada questão
switch($questionValue)
{
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
  _setValue(_textbox("p"+$questionValue), 100);
  break;
  case 6:
  case 7:
  _setValue(_textbox("p"+$questionValue), 150);
  break;
  case 8:
  _setValue(_textbox("p"+$questionValue), 200);
  break;
}
$questionValue +=1;
_click(_submit("gravar"));
}
$questionValue =1;
}
}

function sendMessagePerStudent($arrayEmails,$defaultMessage)
{
  $emails = $arrayEmails;

  for ($i = 0; $i < $emails.length; $i++) {
   _navigateTo('http://ava.brazcubas.br/user/index.php?id=1&search='+encodeURIComponent($emails[$i]));
   if(_count('_cell',"/.*/",_in(_table(1))) >1)
   {
    _click(_checkbox('usercheckbox',_in(_cell('user-index-participants-1_r0_c0', _in(_row(2))))));
    _setSelected(_select("formaction"),1);
    _rteWrite(_iframe('edit-messagebody_ifr'),$defaultMessage);
    _click(_submit("preview"));
    _click(_submit("send"));
  }
  else
  {
    $notFoundEmails.push($emails[$i]);
    continue;
  }
}
}

function setShowTopicUnit($objectListCourses,$sesskey,$topic)
{
    if(_exists(_submit("Ativar edição")))
    {
     _click(_submit("Ativar edição"));
    }
    _wait(1000);
  for ($i = 0; $i < $objectListCourses.length; $i++)
  {
    _navigateTo('http://ava.brazcubas.br/course/view.php?id='+$objectListCourses[$i].ava+'&sesskey='+$sesskey+'&show='+$topic);
    _wait(2500);
  }
}

function removeAulaUBC_SyncApp($arrayListVideoAulaName)
{
  if($arrayListVideoAulaName ==undefined||$arrayListVideoAulaName.length<=0)
  {
    _alert('array vazia ou com número de elementos igual a zero');
    _stop();
  }
  else
  {
    for (var $n=0; $n< $arrayListVideoAulaName.length; $n++) {
      _navigateTo("http://brazcubas-sync-app.herokuapp.com/arquivo");
      _setValue(_textbox("nome"), $arrayListVideoAulaName[$n]);
      _click(_submit("Buscar"));

      if(_exists(_table('table table-condensed table-bordered table-striped')))
      {
       _click(_link("Excluir"));
       _wait(1000);
       _click(_link("excluirLink"));
       _wait(1000);
     }
   }
 }

}

//====================================================
