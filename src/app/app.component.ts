import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { GasModel } from './shared/gas.model';
import { GasService } from './shared/gas.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'app';

    ctx: any;
    ctxBarChart: any;
    myLineChart: any;
    myLineChart2: any;

    mock_usuarios = [
        {
            nome: 'Waltean Costa 1',
            endereco: 'Rua Jangadeiro 1',
            cep: '56350-054',
            bairro: 'Piedade 1',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },
        {
            nome: 'Waltean Costa 2',
            endereco: 'Rua Jangadeiro 2',
            cep: '56350-054',
            bairro: 'Piedade 2',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },
        {
            nome: 'Waltean Costa 3',
            endereco: 'Rua Jangadeiro 3',
            cep: '56350-054',
            bairro: 'Piedade 3',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },
        {
            nome: 'Waltean Costa 4',
            endereco: 'Rua Jangadeiro 4',
            cep: '56350-054',
            bairro: 'Piedade 4',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },
        {
            nome: 'Waltean Costa 5',
            endereco: 'Rua Jangadeiro 5',
            cep: '56350-054',
            bairro: 'Piedade 5',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },
        {
            nome: 'Waltean Costa 6',
            endereco: 'Rua Jangadeiro 6',
            cep: '56350-054',
            bairro: 'Piedade 6',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },
        {
            nome: 'Waltean Costa 7',
            endereco: 'Rua Jangadeiro 7',
            cep: '56350-054',
            bairro: 'Piedade 7',
            tel: '(81)98495-8587',
            email: 'waltean@hotmail.com'
        },

    ];

    gasList: GasModel[];
    xis: any;
    ypson: any;

    constructor(
        private _gasService: GasService,
        private toast: ToastrService
    ) {

    }

    ngOnInit() {
        this.buscarEmployee();
    }

    ngAfterViewInit() {
        this.graficoVendasDiarias();
        this.graficoVendasMensais();

    }

    buscarEmployee() {
        this.xis = this._gasService.getData();
        this.xis.snapshotChanges().subscribe(item => {
            this.toast.success('NOVO PEDIDO!!', 'Realizado');
            this.gasList = [];
            item.forEach(element => {
                this.ypson = element.payload.toJSON();
                this.ypson['$key'] = element.key;
                this.gasList.push(this.ypson as GasModel);
            });
        });
    }

    onDelete(key: string) {
        if (confirm('Você tem ceteza que quer deletar??') === true) {
            this._gasService.deleteEmployee(key);
            this.toast.warning('Deletado Com Sucesso!!', 'Pedido foi Deletado');
        }
    }

    graficoVendasDiarias() {
        this.ctx = document.getElementById('myAreaChart');
        this.myLineChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['Abril 1', 'Abril 2', 'Abril 3', 'Abril 4', 'Abril 5', 'Abril 6', 'Abril 7',
                    'Abril 8', 'Abril 9', 'Abril 10', 'Abril 11', 'Abril 12', 'Abril 13'],
                datasets: [{
                    label: 'Quantidade',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(2,117,216,0.2)',
                    borderColor: 'rgba(2,117,216,1)',
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(2,117,216,1)',
                    pointBorderColor: 'rgba(255,255,255,0.8)',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                    pointHitRadius: 20,
                    pointBorderWidth: 2,
                    data: [2, 6, 2, 15, 7, 1, 4, 20, 17, 10, 11, 6, 8],
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 30,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, .125)',
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        });
    }

    graficoVendasMensais() {
        this.ctxBarChart = document.getElementById('myBarChart');
        this.myLineChart2 = new Chart(this.ctxBarChart, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho'],
                datasets: [{
                    label: 'Revenue',
                    backgroundColor: 'rgba(2,117,216,1)',
                    borderColor: 'rgba(2,117,216,1)',
                    data: [200, 312, 251, 161, 223, 265],
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'month'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 6
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 400,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        });
    }

}
