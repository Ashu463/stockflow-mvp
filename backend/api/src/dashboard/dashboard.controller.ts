import { Controller, Get, Headers } from '@nestjs/common'
import { DashboardService } from './dashboard.service'

@Controller('dashboard')
export class DashboardController {

  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Headers('x-org-id') orgId: string) {
    return this.dashboardService.getDashboard(orgId)
  }

}