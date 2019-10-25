import Vue from "vue";
import { GridPlugin, Edit, Page, Toolbar, Aggregate, VirtualScroll } from "@syncfusion/ej2-vue-grids";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-vue-grids/node_modules/@syncfusion/ej2-data";

Vue.use(GridPlugin);

export default Vue.extend({
    data: () => {
        return {
            pageSettings: { pageSize: 12 },
            sumTemplate: function () {
                return {
                    template: Vue.component('sumTemplate', {
                        template: `<span>Sum: {{data.Sum}}</span>`,
                        data: function () { return { data: { data: {} } }; }
                    })
                }
            },
            avgTemplate: function () {
                return {
                    template: Vue.component('avgTemplate', {
                        template: `<span>Average: {{data.Average}}</span>`,
                        data: function () { return { data: { data: {} } }; }
                    })
                }
            },
            data: new DataManager({
                url: "Home/UrlDatasource",
                adaptor: new UrlAdaptor()
            }),
        };
    },
    methods: {
        customAggregateFn: function (data) {
            return data.result.filter(function (item: any) {
                return item['shipCountry'] === 'Brazil';
            }).length;
        }
    },
    provide: {
        grid: [Edit, Page, Toolbar, Aggregate, VirtualScroll ]
    }
});