import 'package:flutter/material.dart';

class EmpresaRegisterScreen extends StatefulWidget {
  const EmpresaRegisterScreen({super.key});

  @override
  State<EmpresaRegisterScreen> createState() => _EmpresaRegisterScreenState();
}

class _EmpresaRegisterScreenState extends State<EmpresaRegisterScreen> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _nombreEmpresaController = TextEditingController();
  final TextEditingController _correoController = TextEditingController();
  final TextEditingController _telefonoController = TextEditingController();
  final TextEditingController _categoriaController = TextEditingController();
  final TextEditingController _descripcionController = TextEditingController();

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Aquí puedes integrar Firebase, enviar a tu backend, etc.
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Registro enviado correctamente')),
      );

      // Limpia los campos (opcional)
      _nombreEmpresaController.clear();
      _correoController.clear();
      _telefonoController.clear();
      _categoriaController.clear();
      _descripcionController.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Registro de Empresa'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              _buildTextField(_nombreEmpresaController, 'Nombre de la Empresa'),
              _buildTextField(_correoController, 'Correo Electrónico', tipo: TextInputType.emailAddress),
              _buildTextField(_telefonoController, 'Teléfono', tipo: TextInputType.phone),
              _buildTextField(_categoriaController, 'Categoría (Ej. Restaurante, Fitness)'),
              _buildTextField(_descripcionController, 'Descripción', maxLines: 3),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submitForm,
                child: const Text('Registrar'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String label,
      {TextInputType tipo = TextInputType.text, int maxLines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15.0),
      child: TextFormField(
        controller: controller,
        keyboardType: tipo,
        maxLines: maxLines,
        validator: (value) {
          if (value == null || value.trim().isEmpty) {
            return 'Este campo es obligatorio';
          }
          return null;
        },
        decoration: InputDecoration(
          labelText: label,
          border: const OutlineInputBorder(),
        ),
      ),
    );
  }
}
