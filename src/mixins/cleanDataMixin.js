export default {
    methods: {
        removeTag(data, props, tag) {
            switch (tag) {
                case 'p':
                    data[props] = data[props].replace(/<p>/g, "");
                    data[props] = data[props].replace(/<\/p>/g, "");
                    break;

                case 'emstrong':
                    data[props] = data[props].replace(/<em><strong>/g, " ");
                    data[props] = data[props].replace(/<\/strong><\/em>/g, " ");
                    break;

                case 'quote':
                    data[props] = data[props].replace(/&quot;/g, '"');
                    data[props] = data[props].replace(/&nbsp;/g, ' ');
                    break;

                default:
                    break;
            }
        },
    }
}