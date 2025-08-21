document.addEventListener('DOMContentLoaded', () => {
    const horariosData = [
      { "dia": 1, "hora": 7, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 3, "hora": 7, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 5, "hora": 7, "aula": "Boxe", "classe": "boxe" },
      { "dia": 2, "hora": 8, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 4, "hora": 8, "aula": "Sanda", "classe": "sanda" },
      { "dia": 1, "hora": 9, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 3, "hora": 9, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 5, "hora": 9, "aula": "Jiu-Jitsu (Sem Kimono)", "classe": "jiujitsu" },
      { "dia": 2, "hora": 10, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 4, "hora": 10, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 6, "hora": 10, "aula": "Jiu-Jitsu (Aulão)", "classe": "jiujitsu" },
      { "dia": 1, "hora": 11, "aula": "MMA", "classe": "mma" },
      { "dia": 3, "hora": 11, "aula": "MMA", "classe": "mma" },
      { "dia": 5, "hora": 11, "aula": "MMA", "classe": "mma" },
      { "dia": 2, "hora": 12, "aula": "Boxe", "classe": "boxe" },
      { "dia": 4, "hora": 12, "aula": "Boxe", "classe": "boxe" },
      { "dia": 1, "hora": 15, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 3, "hora": 15, "aula": "Defesa Pessoal (Krav Maga)", "classe": "defesapessoal" },
      { "dia": 5, "hora": 15, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 2, "hora": 16, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 4, "hora": 16, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 1, "hora": 17, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 3, "hora": 17, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 5, "hora": 17, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 2, "hora": 18, "aula": "Boxe", "classe": "boxe" },
      { "dia": 4, "hora": 18, "aula": "Boxe", "classe": "boxe" },
      { "dia": 1, "hora": 19, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 3, "hora": 19, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 5, "hora": 19, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 1, "hora": 20, "aula": "Funcional Fight", "classe": "funcionalfight" },
      { "dia": 2, "hora": 20, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 3, "hora": 20, "aula": "Funcional Fight", "classe": "funcionalfight" },
      { "dia": 4, "hora": 20, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 1, "hora": 21, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 2, "hora": 21, "aula": "MMA", "classe": "mma" },
      { "dia": 3, "hora": 21, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 4, "hora": 21, "aula": "MMA", "classe": "mma" }
    ];

    const gradeCompleta = [];

    // Função para buscar e processar os horários
    async function carregarHorarios() {
        try {
            // Use os dados embutidos diretamente
            gradeCompleta.push(...horariosData);
            
            // Depois que os dados são carregados, construa a grade e configure o status
            construirGradeHorarios(gradeCompleta);
            atualizarStatus(gradeCompleta);
            configurarFiltros();

        } catch (error) {
            console.error('Erro ao carregar os horários:', error);
            const tabelaBody = document.querySelector('#grade-horarios tbody');
            if (tabelaBody) {
                tabelaBody.innerHTML = '<tr><td colspan="7">Não foi possível carregar os horários. Tente novamente mais tarde.</td></tr>';
            }
        }
    }
