import Drawer from 'antd/es/drawer'
import Descriptions from 'antd/es/descriptions'
import Tag from 'antd/es/tag'
import Spin from 'antd/es/spin'

import { useTranslation } from 'react-i18next'
import { useGetEvent } from '@/api/events/hooks'
import type { Nullable } from '@/types/common'
import { SEVERITY_COLORS } from '../../constants'
import { formatTimestamp } from '../../utils'

import 'antd/dist/reset.css'

interface Props {
  eventId: Nullable<string>
  onClose: () => void
}

export function EventDrawer({ eventId, onClose }: Props) {
  const { t } = useTranslation()
  const { data: event, isLoading } = useGetEvent(eventId)

  return (
    <Drawer title={t('events.drawer.title')} open={!!eventId} onClose={onClose}>
      {isLoading && <Spin />}
      {event && (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label={t('events.table.columns.id')}>
            {event.id}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.table.columns.timestamp')}>
            {formatTimestamp(event.timestamp)}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.table.columns.type')}>
            {event.type}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.table.columns.severity')}>
            <Tag color={SEVERITY_COLORS[event.severity]}>{event.severity}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('events.table.columns.user')}>
            {event.user}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.table.columns.workstation')}>
            {event.workstation}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.drawer.labels.ip')}>
            {event.ip}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.drawer.labels.location')}>
            {event.location}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.drawer.labels.sessionId')}>
            {event.sessionId}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.drawer.labels.userAgent')}>
            {event.userAgent}
          </Descriptions.Item>
          <Descriptions.Item label={t('events.drawer.labels.details')}>
            {event.details}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  )
}
