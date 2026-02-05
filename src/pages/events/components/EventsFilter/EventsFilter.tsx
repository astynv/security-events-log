import Button from 'antd/es/button'
import DatePicker from 'antd/es/date-picker'
import Input from 'antd/es/input'
import Select from 'antd/es/select'
import Space from 'antd/es/space'

import 'antd/dist/reset.css'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import ClearOutlined from '@ant-design/icons/ClearOutlined'

import { useTranslation } from 'react-i18next'
import type { Filters, Severity } from '@/types/events'
import type { Nullable } from '@/types/common'
import { SEVERITY_OPTIONS } from '../../constants'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  onReset: () => void
}

export function EventsFilter({ filters, onChange, onReset }: Props) {
  const { t } = useTranslation()
  const handleSeverityChange = (value: Severity | undefined) => {
    onChange({ ...filters, severity: value })
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, user: e.target.value || undefined })
  }

  const handleDateChange = (
    dates: Nullable<[Nullable<dayjs.Dayjs>, Nullable<dayjs.Dayjs>]>
  ) => {
    if (dates && dates[0] && dates[1]) {
      onChange({
        ...filters,
        dateFrom: dates[0].startOf('day').toISOString(),
        dateTo: dates[1].endOf('day').toISOString(),
      })
    } else {
      onChange({ ...filters, dateFrom: undefined, dateTo: undefined })
    }
  }

  const dateValue: Nullable<[dayjs.Dayjs, dayjs.Dayjs]> =
    filters.dateFrom && filters.dateTo
      ? [dayjs(filters.dateFrom), dayjs(filters.dateTo)]
      : null

  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Select
        placeholder={t('events.filter.severity')}
        allowClear
        style={{ width: 130 }}
        value={filters.severity}
        onChange={handleSeverityChange}
        options={SEVERITY_OPTIONS}
      />

      <Input
        placeholder={t('events.filter.searchUser')}
        allowClear
        style={{ width: 180 }}
        prefix={<SearchOutlined />}
        value={filters.user || ''}
        onChange={handleUserChange}
      />

      <RangePicker value={dateValue} onChange={handleDateChange} />

      <Button icon={<ClearOutlined />} onClick={onReset}>
        {t('events.filter.reset')}
      </Button>
    </Space>
  )
}
