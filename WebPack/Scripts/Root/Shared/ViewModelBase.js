
class ViewModelBase {
   
    async init() {
        await this.onPreInit();
        await this.onInit();
        await this.onPostInit();
    }
    
    async onPreInit() {
        return Promise.resolve();
    }

    async onInit() {
        let data = await this.loadData();
        await bindData(data);

        return Promise.all(
            bindData()
        );
    }

    async onPostInit() {
        return Promise.resolve();
    }

    loadData() {
        return Promise.resolve(data);
    }

    bindData(data) {
        ko.applyBindings(data, this);
    }
}

export default ViewModelBase;