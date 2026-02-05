import { useState } from 'react'

import Table from 'antd/es/table'
import Tag from 'antd/es/tag'
import Alert from 'antd/es/alert'
import Empty from 'antd/es/empty'

import 'antd/dist/reset.css'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'

import { useTranslation } from 'react-i18next'
import { useGetEvents } from '@/api/events/hooks'
import { useUrlParams } from '@/hooks/common/useUrlParams'
import { EventsFilter } from '../EventsFilter/EventsFilter'
import { EventDrawer } from '../EventsDrawer/EventsDrawer'

import type {
  SecurityEvent,
  Severity,
  EventsRequest,
  Filters,
} from '@/types/events'
import type { Nullable } from '@/types/common'

import { SEVERITY_COLORS, EMPTY_FILTERS } from '../../constants'
import { formatTimestamp } from '../../utils'
import styles from './EventsTable.module.scss'

export function EventsTable() {
  const { t } = useTranslation()
  const { params, setParams } = useUrlParams()
  const [selectedEventId, setSelectedEventId] = useState<Nullable<string>>(null)

  const columns: ColumnsType<SecurityEvent> = [
    {
      title: t('events.table.columns.id'),
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: t('events.table.columns.timestamp'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: true,
      width: 180,
      render: formatTimestamp,
    },
    {
      title: t('events.table.columns.type'),
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: t('events.table.columns.severity'),
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      render: (severity: Severity) => (
        <Tag color={SEVERITY_COLORS[severity]}>{severity}</Tag>
      ),
    },
    {
      title: t('events.table.columns.user'),
      dataIndex: 'user',
      key: 'user',
      width: 150,
    },
    {
      title: t('events.table.columns.workstation'),
      dataIndex: 'workstation',
      key: 'workstation',
      width: 120,
    },
  ]

  const { data, isLoading, isError } = useGetEvents(params)

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, unknown>,
    sorter: SorterResult<SecurityEvent> | SorterResult<SecurityEvent>[]
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter

    const newParams: EventsRequest = {
      ...params,
      pagination: {
        page: pagination.current || 1,
        size: pagination.pageSize || 10,
      },
    }

    if (singleSorter?.order) {
      newParams.sort = {
        field: 'timestamp',
        order: singleSorter.order === 'ascend' ? 'asc' : 'desc',
      }
    } else {
      newParams.sort = undefined
    }

    setParams(newParams)
  }

  const handleFiltersChange = (filters: Filters) => {
    setParams({
      ...params,
      filters,
      pagination: { ...params.pagination, page: 1 },
    })
  }

  const handleFiltersReset = () => {
    setParams({
      ...params,
      filters: EMPTY_FILTERS,
      pagination: { ...params.pagination, page: 1 },
    })
  }

  const handleRowClick = (record: SecurityEvent) => {
    setSelectedEventId(record.id)
  }

  const handleDrawerClose = () => {
    setSelectedEventId(null)
  }

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <EventsFilter
          filters={params.filters || EMPTY_FILTERS}
          onChange={handleFiltersChange}
          onReset={handleFiltersReset}
        />
        <Alert
          message={t('events.error.title')}
          description={t('events.error.description')}
          type="error"
          showIcon
        />
      </div>
    )
  }

  const emptyText =
    params.filters?.severity || params.filters?.user || params.filters?.dateFrom
      ? t('events.table.empty.noMatches')
      : t('events.table.empty.noEvents')

  return (
    <div className={styles.container}>
      <EventsFilter
        filters={params.filters || EMPTY_FILTERS}
        onChange={handleFiltersChange}
        onReset={handleFiltersReset}
      />
      <div className={styles.tableWrapper}>
        <Table
          columns={columns}
          dataSource={data?.items}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{
            current: params.pagination.page,
            pageSize: params.pagination.size,
            total: data?.total,
            showSizeChanger: true,
            showTotal: (total) =>
              t('events.table.pagination.total', { count: total }),
          }}
          locale={{
            emptyText: <Empty description={emptyText} />,
          }}
        />
      </div>
      <EventDrawer eventId={selectedEventId} onClose={handleDrawerClose} />
    </div>
  )
}
