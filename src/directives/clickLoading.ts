// import { Loading } from 'ant-design-vue';
import type { DirectiveBinding, Directive, App } from 'vue';

interface ClickLoadingElement extends HTMLElement {
  _clickLoadingListener?: any;
  _clickLoadingFunctionInstance?: any;
}

const bindListener = (el: ClickLoadingElement, binding: DirectiveBinding) => {
  if (el._clickLoadingListener) {
    el.removeEventListener('click', el._clickLoadingListener);
  }
  el._clickLoadingListener = async (event) => {
    event.stopPropagation();
    if (el._clickLoadingFunctionInstance) {
      return el._clickLoadingFunctionInstance;
    }

    // 创建loading元素
    const loadingElement = document.createElement('span');
    loadingElement.className = 'loading loading-ring loading-xs';
    const containerElement = document.createElement('div');
    containerElement.append(loadingElement);

    // 创建mask元素
    const maskElement = document.createElement('div');
    maskElement.className =
      'absolute -left-[1px] -top-[1px] -right-[1px] -bottom-[1px] bg-white/40 flex items-center justify-center';
    maskElement.id = 'click_loading_mask';

    // 将loading元素插入到mask中
    maskElement.appendChild(containerElement);

    // 将mask元素插入到el中
    el.appendChild(maskElement);

    try {
      el._clickLoadingFunctionInstance = binding.value;

      await el._clickLoadingFunctionInstance();
    } catch (error) {
      if (error === 'cancel') {
        return void 0;
      }
      throw error;
    } finally {
      el._clickLoadingFunctionInstance = null;
      el.querySelector('#click_loading_mask')?.remove();
    }
  };

  el.addEventListener('click', el._clickLoadingListener);
};

export const clickLoading: Directive = {
  created: bindListener,
  updated: bindListener,
  unmounted(el) {
    if (el._clickLoadingListener) {
      el.removeEventListener('click', el._clickLoadingListener);
    }
  },
};

export function setupClickLoadingDirective(app: App) {
  app.directive('clickLoading', clickLoading);
}

export default clickLoading;
