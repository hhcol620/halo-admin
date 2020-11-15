import service from '@/utils/service'

const baseUrl = '/api/admin/read'

const charts = {}

charts.request = () => {
  return service({
    url: `${baseUrl}/trend/3`,
    method: 'get'
  })
}

export default charts
