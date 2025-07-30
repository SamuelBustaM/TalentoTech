/* Configuracion de Supabase */
const SUPABASE_URL = 'https://rihdjypefyotdcvxtqdg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGRqeXBlZnlvdGRjdnh0cWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTAyNjUsImV4cCI6MjA2OTQ2NjI2NX0.VSOeSIQ2uEn8aODv3EdIF4_q-Vx_w_1tVDIADReF81c';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


document.addEventListener("DOMContentLoaded", async function (){
    /* Autenticacion Anonima */
    await supabase.auth.signInAnonymously();

    //Ejecutar todas las funciones
    fetchTop20Paises ();
    fetchTopRegiones ();
    fetchColombiaVsSuramerica ();
    //grafico de barras de top 20 paises con mayor produccion de energias renovables
    async function fetchTop20Paises () {
        const { data, error } = await supabase
            .from('top_20_paises')
            .select('*')
            .order('promedio_renovable', {ascending: false})
            .limit(20);
        if (error) throw error;
        createBarChart ('graficoBarrasPaises',data, 'pais', 'promedio_renovables', 'Porcentaje de Energia Renovable', 'rgba(54, 162, 235, 0.6)');

    }

    //Grafico de Barras de Produccion de Energia Renovable por Regiones
     async function fetchtopregiones () {
        const { data, error } = await supabase
            .from('top_regiones')
            .select('*')
            .order('promedio_renovable', {ascending: false});

        if (error) throw error;
        createBarChart ('graficoBarrasRegiones',data, 'region', 'promedio_renovables', 'Porcentaje de Energia Renovable por region', 'rgba(219, 216, 15, 0.6)');
    }

    //Funcion para crear graficos de barras
    function createBarChart(canvasId, data, labelField, dataField, label, backgroundColor) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            datasets : {
                label: label,
                data: data.map(item => item[labelField]),
                backgroundColor: 'rgba(54,162,235, 0.6)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1
            }
        })
    }


    fetch('data/top_20_paises.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarrasPaises').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.pais),
                    datasets: [{
                        label: 'Porcentaje de Energia Renovable',
                        data: data.map(item => item['promedio_renovables']),
                        backgroundColor: 'rgba(54,162,235, 0.6)',
                        borderColor: 'rgba(54,162,235,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Porcentaje (%)'
                            }
                        },
                        x: {
                            title: {
                                display:true,
                                text: 'Paises'

                            }
                        }
                    }
                }
            });
        });
        /* Grafico de Barras de Produccion de Energias Renovables por regiones */
            fetch('data/topRegiones.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarrasRegiones').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Region),
                    datasets: [{
                        label: 'Porcentaje de Energia Renovable',
                        data: data.map(item => item['Promedio Renovables']),
                        backgroundColor: 'rgba(148, 54, 235, 0.6)',
                        borderColor: 'rgba(184, 54, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Porcentaje (%)'
                            }
                        },
                        x: {
                            title: {
                                display:true,
                                text: 'Regiones'

                            }
                        }
                    }
                }
            });
});
        /* Grafica de Lineas de Comparativa de Comparativa de Produccion de Energia Renovable*/
        fetch('data/colombia_SurAmerica.json')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item =>item.Anno <=2021);
                const ctx =document.getElementById('graficoLineasComparativas').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [...new Set(filteredData.map(item => item.Anno ))], 
                        datasets: [
                            {
                                label: 'Colombia',
                                data: filteredData.filter(item =>item.Region ==='Colombia').map(item => item.Renovable),
                                borderColor: 'rgba(rgba(204, 6, 49, 0.6)',
                                backgroundColor:'rgba(0, 0, 0, 1)',
                                fill: false,
                                borderWidth: 1,
                                tension:0.2,
                            },
                            {
                                label: 'Suramerica',
                                data: filteredData.filter(item =>item.Region ==='Suramerica').map(item => item.Renovable),
                                borderColor: 'rgba(rgba(6, 204, 72, 0.6)',
                                backgroundColor:'rgba(9, 255, 120, 0.75)',
                                fill: false,
                                borderWidth: 1,
                                tension:0.2,
                            }
                        ]
                    }
                })
            })
});
