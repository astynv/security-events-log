import Button from 'antd/es/button'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.scss'

const LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'ru', label: 'Русский', shortLabel: 'РУ' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
  }

  return (
    <div className={styles.container}>
      <GlobalOutlined className={styles.icon} />
      {LANGUAGES.map((lang) => (
        <Button
          key={lang.code}
          type={i18n.language === lang.code ? 'primary' : 'text'}
          size="small"
          onClick={() => handleLanguageChange(lang.code)}
          className={styles.button}
        >
          {lang.shortLabel}
        </Button>
      ))}
    </div>
  )
}
