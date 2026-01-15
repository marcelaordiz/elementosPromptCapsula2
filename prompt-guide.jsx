import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Lightbulb, BookOpen, Paperclip, Target, Sparkles } from 'lucide-react';

const PromptGuide = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'instruccion',
      title: 'Instrucción',
      icon: Target,
      color: 'bg-purple-500',
      definition: 'Lo que querés que el modelo haga. Podés desarmarlo en pasos para mayor precisión.',
      examples: [
        {
          basic: 'Dame una receta para cocinar buñuelos',
          advanced: 'Quiero una receta para cocinar buñuelos. Para eso: 1) Buscá en internet las recetas más utilizadas, 2) Hacé una síntesis de los pasos que se repiten, 3) Agregá tips que hayas encontrado para que pueda elegir cuáles utilizar.'
        }
      ]
    },
    {
      id: 'contexto',
      title: 'Contexto',
      icon: BookOpen,
      color: 'bg-blue-500',
      definition: 'Información clave que ayuda al modelo a entender mejor tu pedido. Anticipá qué datos pueden ser útiles, aunque te parezcan obvios.',
      tip: '¿Qué puede fallar si no doy contexto? El modelo puede asumir información incorrecta basándose en lo más común.',
      examples: [
        {
          problem: 'En muchos países de LATAM los buñuelos son dulces.',
          solution: 'Aclará: "Los buñuelos que quiero cocinar son de acelga" o "No como lácteos" o "Solo quiero usar ingredientes que tengo en casa".'
        }
      ]
    },
    {
      id: 'datos',
      title: 'Datos adjuntos',
      icon: Paperclip,
      color: 'bg-green-500',
      definition: 'Archivos o ejemplos que agregás para dar más información: una imagen de referencia, una planilla de Excel, un documento.',
      tip: 'No todos los modelos aceptan los mismos formatos. Verificá qué puede procesar el modelo que estás usando.',
      alternatives: 'Si el modelo no acepta tu archivo, intentá: pegarlo directamente en el prompt o describirlo detalladamente.'
    },
    {
      id: 'output',
      title: 'Indicador de output',
      icon: Sparkles,
      color: 'bg-orange-500',
      definition: 'Cómo querés recibir la respuesta: ¿en forma de lista? ¿en un PDF? ¿con un paso a paso ilustrado con emojis?',
      examples: [
        {
          text: 'Quiero que la receta imite el formato de esta que te dejo de ejemplo: [enlace]'
        }
      ]
    }
  ];

  const bonusTips = [
    'Ajustá el tono de la respuesta (amigable, gracioso, seco, preciso)',
    'Pedile que responda poniéndose en un rol específico (sos una especialista en recetas veganas)',
    'Utilizá mayúsculas y símbolos como corchetes [ ] para diferenciar secciones del prompt'
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" style={{ fontFamily: 'Dosis, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Cómo armar un buen prompt
          </h1>
          <p className="text-xl text-gray-600">
            Cuatro componentes esenciales para comunicarte efectivamente con la IA
          </p>
        </div>

        {/* Main Components */}
        <div className="space-y-4 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => setActiveSection(isActive ? null : section.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${section.color} p-3 rounded-xl text-white`}>
                      <Icon size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                  </div>
                  {isActive ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
                
                {isActive && (
                  <div className="px-6 pb-6 space-y-4 animate-fadeIn">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {section.definition}
                    </p>
                    
                    {section.tip && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p className="text-gray-700">
                          <strong>💡 Importante:</strong> {section.tip}
                        </p>
                      </div>
                    )}

                    {section.alternatives && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <p className="text-gray-700">
                          <strong>🔄 Alternativa:</strong> {section.alternatives}
                        </p>
                      </div>
                    )}
                    
                    {section.examples && section.id === 'instruccion' && (
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-gray-500 mb-2">Versión básica:</p>
                          <p className="text-gray-800">{section.examples[0].basic}</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
                          <p className="text-sm font-semibold text-purple-700 mb-2">Versión mejorada:</p>
                          <p className="text-gray-800">{section.examples[0].advanced}</p>
                        </div>
                      </div>
                    )}

                    {section.examples && section.id === 'contexto' && (
                      <div className="space-y-3">
                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                          <p className="text-sm font-semibold text-red-700 mb-2">⚠️ Problema:</p>
                          <p className="text-gray-800">{section.examples[0].problem}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                          <p className="text-sm font-semibold text-green-700 mb-2">✓ Solución:</p>
                          <p className="text-gray-800">{section.examples[0].solution}</p>
                        </div>
                      </div>
                    )}

                    {section.examples && section.id === 'output' && (
                      <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                        <p className="text-gray-800 italic">{section.examples[0].text}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bonus Tips */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb size={32} className="animate-pulse" />
            <h2 className="text-3xl font-bold">Bonus Track</h2>
          </div>
          <p className="text-lg mb-4 opacity-90">
            Extras para llevar tus prompts al siguiente nivel:
          </p>
          <ul className="space-y-3">
            {bonusTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <span className="text-lg">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final Message */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow-lg p-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            <strong>Recordá:</strong> A medida que ganás experiencia, te volvés mejor detectando qué información es clave. 
            No necesitás tener un prompt perfecto desde el inicio—podés ir ajustando a lo largo de la conversación.
          </p>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@400;600;700;800&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PromptGuide;
