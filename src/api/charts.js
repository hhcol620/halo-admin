import service from '@/utils/service'

const baseUrl = '/api/admin/read'

const charts = {}

charts.request = type => {
  return service({
    url: `${baseUrl}/trend/${type}`,
    method: 'get'
  })
}

export default charts
