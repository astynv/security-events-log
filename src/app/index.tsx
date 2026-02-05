import ConfigProvider from 'antd/es/config-provider'
import Layout from 'antd/es/layout'
import Typography from 'antd/es/typography'

import 'antd/dist/reset.css'

import enUS from 'antd/locale/en_US'
import ruRU from 'antd/locale/ru_RU'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EventsPage } from '../pages/events/EventsPage'
import { LanguageSwitcher } from '../components/LanguageSwitcher/LanguageSwitcher'
import '../i18n/config'
import '../styles/global.scss'
import styles from './App.module.scss'

const { Header, Content } = Layout
const { Title } = Typography

function App() {
  const { t, i18n } = useTranslation()
  const antdLocale = i18n.language === 'ru' ? ruRU : enUS

  return (
    <ConfigProvider locale={antdLocale}>
      <BrowserRouter>
        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <Title level={3} className={styles.title}>
              {t('app.title')}
            </Title>
            <LanguageSwitcher />
          </Header>
          <Content className={styles.content}>
            <Routes>
              <Route path="/events" element={<EventsPage />} />
              <Route path="/" element={<Navigate to="/events" replace />} />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
