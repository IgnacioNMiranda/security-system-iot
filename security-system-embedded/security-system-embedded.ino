// Librerias utilizadas
#include <Keypad.h>
#include <LiquidCrystal.h>
#include <Servo.h>

#define PINSERVO A4
#define PINLEDROJO 2
#define PINLEDVERDE 3
#define PINBUZZER 4

// Notas utilizadas en parlante.
#define NOTE_D5  587
#define NOTE_F5  698
#define NOTE_A5  880
#define NOTE_C6  1047
#define NOTE_D6  1175

// Variables utilizadas para definir largo y notas de
// canción para contraseña correcta.
int melodiaCorrecta[] = { NOTE_A5, 0, NOTE_C6, 0, NOTE_A5, 0, NOTE_D6, 0 };
int duracionesCorrecta[] = { 210, 20, 210, 20, 210, 20, 210, 20 };
int longitudCancionCorrecta = sizeof(melodiaCorrecta) / sizeof(melodiaCorrecta[0]);

// Variables utilizadas para definir largo y notas de
// canción para contraseña incorrecta.
int melodiaIncorrecta[] = { NOTE_F5, 0, NOTE_D5, 0 };
int duracionesIncorrecta[] = { 400, 20, 600, 20 };
int longitudCancionIncorrecta = sizeof(melodiaIncorrecta) / sizeof(melodiaIncorrecta[0]);


// Variables necesarias para el teclado numérico.
int A = 0, B = 0, C = 0, D = 0; // Acumuladores de datos enteros para la contraseña.
int numeroActual = 0; // Cuenta la cantidad de digitos de contraseña que se ha ingresado.
int C1 = 1, C2 = 2, C3 = 3, C4 = 4; // Contraseña.
char asterisco = '*';  // Caracter para ocultar dígito de contraseña.
int intentosRealizados = 0; // 3 intentos para ingresar la contraseña correcta.
int aviso = 3; // Número de intentos totales posibles.

const byte numRows = 3; //Numero de filas del teclado.
const byte numCols = 3; //Numero de columnas del teclado.

char key; // Digito ingresado en el teclado numérico.

// Keymap define las teclas que aparecen en el teclado.
char keymap[numRows][numCols] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'}
};

byte rowPins[numRows] = { 12, 11, 10 }; // Filas 0 a 2.
byte colPins[numCols] = { A0, A1, A2 }; // Columnas 0 a 2.

// Inicializacion y configuracion del teclado.
Keypad teclado = Keypad(makeKeymap(keymap), rowPins, colPins, numRows, numCols);

// Inicializacion de LCD.
LiquidCrystal lcd(13, 9, 8, 7, 6, 5); // RS, E, D4, D5, D6, D7

// Inicializacion del Servo.
Servo servo;

void setup() {
  lcd.begin(16, 2); // LCD (16 COLUMNAS Y 2 FILAS)
  Serial.begin(9600);
  pinMode(PINLEDVERDE, OUTPUT); // Clave correcta enciende led verde.
  pinMode(PINLEDROJO, OUTPUT); // Clave incorrecta enciende led rojo.
  servo.attach(PINSERVO);
  servo.write(0);
}

void loop() {
   // Obtiene el número ingresado en el teclado numérico.
  key = teclado.getKey();
  if (!key) {
    lcd.setCursor(0, 0), lcd.print("Ingrese la clave"); // Portada de inicio en el LCD
  } else {
    ingresarDigito();
  }
}

/**
   Lee la lectura de un digito en el teclado numérico.
*/
void ingresarDigito() {
  lcd.setCursor(6 + numeroActual, 1);
  lcd.print(key); // Se imprime digito ingresado.
  delay(250);
  lcd.setCursor(6 + numeroActual, 1);
  lcd.print(asterisco); // Se oculta el digito.
  key = key - 48; // Conversión de char a número según el código ASCII.
  numeroActual++; //el numero de contraseña ingresado se incrementa para los case1, case2, case3, case4.
  switch (numeroActual) {
    case 1:
      A = key; // Se almacena primer dígito para la contraseña, debiera ser 1
      break;
    case 2:
      B = key; // Se almacena segundo dígito para la contraseña, debiera ser 2
      break;
    case 3:
      C = key; // Se almacena tercer dígito para la contraseña, debiera ser 3
      break;
    case 4:
      D = key; // Se almacena cuarto dígito para la contraseña, debiera ser 4
      validarContrasenia();
  }
}

/**
 * Valida que la contraseña ingresada sea la correcta.
 */
void validarContrasenia() {
  if (A == C1 && B == C2 && C == C3 && D == C4) {
    // Imprime Clave Correcta
    intentosRealizados = 0;
    aviso = 3;
    lcd.clear();
    lcd.setCursor(5, 0);
    lcd.print("Clave");
    lcd.setCursor(4, 1);
    lcd.print("Correcta");

    concederAcceso();
    resetearPuerta();
  } else {
    // Imprime Clave Incorrecta
    lcd.clear();
    lcd.setCursor(6, 0);
    lcd.print("Clave");
    lcd.setCursor(3, 1);
    lcd.print("Incorrecta");

    // Prender led rojo
    digitalWrite(PINLEDROJO, HIGH);

    // Reproduce la canción indicando que la contraseña es incorrecta.
    for (int nota = 0; nota < longitudCancionIncorrecta; nota++) {
      int duracion = duracionesIncorrecta[nota];
      tone(PINBUZZER, melodiaIncorrecta[nota], duracion);
      int pausa = duracion * 1.1;
      delay(pausa);
      noTone(PINBUZZER);
    }

    // Apaga el led y limpia LCD.
    lcd.clear();
    digitalWrite(PINLEDROJO, LOW);

    contrasenaIncorrecta();
  }
}

/**
 * Concede el acceso, encendiendo el led verde y abriendo la puerta.
 */
void concederAcceso() {
  Serial.println("accesoConcedido"); // Imprime accesoConcedido mediante el puerto Serial para informar a la aplicación que está corriendo en Node.js.
   
  // Enciende led verde.
  digitalWrite(PINLEDVERDE, HIGH);

  // Reproduce la canción para contraseña correcta.
  for (int nota = 0; nota < longitudCancionCorrecta; nota++) {
    int duracion = duracionesCorrecta[nota];
    tone(PINBUZZER, melodiaCorrecta[nota], duracion);
    int pausa = duracion * 1.1;
    delay(pausa);
    noTone(PINBUZZER);
  }

  // Limpia LCD.
  lcd.clear();

  // Se mueve el servo 180° para simular apertura de puerta.
  servo.write(180);

  lcd.setCursor(4, 0), lcd.print("ACCESO");
  lcd.setCursor(3, 1), lcd.print("CONCEDIDO");

  // Mantiene abierta la puerta durante 5 segundos.
  unsigned int t_inicio = millis();
  unsigned int t_final = millis();
  while (t_final - t_inicio < 5000) {
    t_final = millis();  
  }
}

void contrasenaIncorrecta() {
  Serial.println("contrasenaIncorrecta"); // Imprime contrasenaIncorrecta mediante el puerto Serial para informar a la aplicación que está corriendo en Node.js.

  intentosRealizados++; // Se incrementa los intentos incorrectos de password para el bloqueo.
  aviso--; // Decremento de variable aviso, de 3 hasta 0 según número de intentos fallidos al ingresar la contraseña.
  lcd.setCursor(2, 0);
  lcd.print("LE QUEDA: ");
  lcd.setCursor(13, 0);
  lcd.print(aviso);
  lcd.setCursor(2, 1);
  lcd.print("OPORTUNIDAD");
  if (aviso == 0) {
    // Si ya se han hecho 3 avisos (3 intentos incorrectos), la alarma es activada.
    lcd.clear();
    lcd.setCursor(5, 0);
    lcd.print("ALARMA");
    lcd.setCursor(4, 1);
    lcd.print("ACTIVADA");
    alertaPolicia(); // Se llama al metodo para alarmar a la policía.
  }
  delay(500);
  numeroActual = 0;
  lcd.clear();
}

/*
   Simula la alerta a policía si ya se hicieron 3 intentos.
*/
void alertaPolicia() {
  Serial.println("alertaIngresoFallido"); // Imprime alertaIngresoFallido mediante el puerto Serial para informar a la aplicación que está corriendo en Node.js.
  
  // Bucle infinito de seguridad para bloquear los reintentos de ingreso
  // de contraseña.
  lcd.setCursor(1, 0), lcd.print("Alerta Policia");
  lcd.setCursor(4, 1), lcd.print("Intrusos");
  while (intentosRealizados >= 3) {
    // Enciende y apaga el led rojo de forma continua.
    digitalWrite(PINLEDROJO, HIGH);
    delay(500);
    digitalWrite(PINLEDROJO, LOW);
    delay(50);
  }
}

/**
 * Settea nuevamente el estado inicial de la puerta.
 */
void resetearPuerta() {
  // Se resetean las variables referentes al ingreso de contraseña.
  numeroActual = 0;
  A, B, C, D = 0, 0, 0, 0;
  intentosRealizados = 0;
  aviso = 3;

  // Se resetea posición de la puerta y luz led verde.
  digitalWrite(PINLEDVERDE, LOW);
  servo.write(0);
  
  lcd.clear();
}
