import styles from './index.less';
import { history } from 'umi'
import { Button } from 'antd'

export default function IndexPage() {

  const toUser = () => {
    history.push('/user')
  }
  const toUserNoParams = () => {
    history.push({
		pathname: '/user',
		query: {
			a: '1',
		}
	})
  }
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
	  <Button type="primary" onClick={toUser}>跳转不带参数</Button>
	  <Button type="primary" onClick={toUserNoParams}>跳转不带参数</Button>
    </div>
  );
}
