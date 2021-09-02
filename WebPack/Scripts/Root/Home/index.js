import ko from 'knockout';
import ViewModelBase from '../Shared/ViewModelBase';

class ViewModel extends ViewModelBase {
    constructor() {
        super();

        this.input1 = ko.observable("");
    }

    onClick = function ()
    {
        this.input1("test");
    }

    async onInit() {
        super.onInit();

        ko.applyBindings(this);
    }
}

window.ViewModel = new ViewModel();

if (onModelBound) {
    onModelBound();
}


