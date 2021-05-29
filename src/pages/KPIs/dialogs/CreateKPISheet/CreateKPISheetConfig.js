import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const stepNames = {
    step1: 'Initial KPI Group',
    step2: 'Modify Criteria',
    step3: 'Apply'
}

export const steps = [stepNames.step1, stepNames.step2, stepNames.step3]

export const getStepContent = (step, KPI, setKPI) => {
    switch (step) {
        case 0:
            return (
                <Step1 KPI={KPI} setKPI={setKPI} />
            )
        case 1:
            return (
                <Step2 KPI={KPI} setKPI={setKPI} />
            )
        case 2:
            return (
                <Step3 KPI={KPI} setKPI={setKPI} />
            )
        default:
            break
    }
}

export const previewColumns = [
    { key: 'no', name: '#', sortable: false, width: '2%' },
    { key: 'name', name: 'KPI Group Name', sortable: true, width: '48%', },
    { key: 'targetValue', name: 'Target Value', sortable: true, width: '22%' },
    { key: 'weight', name: 'Weight', sortable: true, width: '15%' },
    { key: '', name: '', sortable: false, width: '8%' },
]