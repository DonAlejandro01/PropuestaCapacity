 function VerHorario(){
    // primero tenemos que leer el correo del personas
    const CorreoFuncionario = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const HojaFuncionario = ss.getSheetByName('FUNCIONARIO')
    const HojaHorario= ss.getSheetByName('HORARIO')

    const DatosFuncionarios = HojaFuncionario.getDataRange().getValues();
    const DatosHorario = HojaHorario.getDataRange().getValues();

    // Creamos variable para guardar bp
    let bp = null;
    // Recorremos hoja funcionarios para matechar el correo y devolver el bp del funcionario
    for(let i=0; i<HojaHorario.length;i++){
        if(DatosFuncionarios[i][10] === CorreoFuncionario){
            bp = DatosFuncionarios[i][0]//Devuelveme el bp del funcionario matcheado
            break;
        }
    }
    if(!bp){
        return{error:'Usuario no encontrado en la hoja de funcionarios'}
    }

    //Variable para guardar horario del funcionario.
    const HorarioFuncionario = [];
    const mesActual = new Date().getMonth();
    for(let i=1; i<DatosHorario.length;i++){
        if(DatosHorario[i][0] === bp && new Date(DatosHorario[i][3]).getMonth() === mesActual){
            HorarioFuncionario.push({
                fecha: DatosHorario[i][1],
                turno: DatosHorario[i][2],
                horario: DatosFuncionarios[i][3]  
            });
        }   
    }

    return HorarioFuncionario;
 }