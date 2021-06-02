const stepNames = {
    step1: 'Initial KPI Group',
    step2: 'Modify Criteria',
    step3: 'Apply'
}

export const steps = [stepNames.step1, stepNames.step2, stepNames.step3]

export const previewColumns = [
    { key: 'no', name: '#', sortable: false, width: '2%' },
    { key: 'name', name: 'KPI Group Name', sortable: true, width: '48%', },
    { key: 'targetValue', name: 'Target Value', sortable: true, width: '22%' },
    { key: 'weight', name: 'Weight', sortable: true, width: '15%' },
    { key: '', name: '', sortable: false, width: '8%' },
]