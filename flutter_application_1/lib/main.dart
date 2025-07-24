import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'Cliente/screens/home_screen_clientes.dart';
import 'Cliente/screens/login_screen.dart'; // Asegúrate de tener esta pantalla

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Tu App de Ofertas',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFFFFFFF)),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      // Usa StreamBuilder para escuchar el estado de autenticación
      home: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator()); // Pantalla de carga
          } else if (snapshot.hasData) {
            return const HomeScreen(); // Usuario autenticado
          } else {
            return const LoginScreen(); // Usuario no autenticado
          }
        },
      ),
    );
  }
}
