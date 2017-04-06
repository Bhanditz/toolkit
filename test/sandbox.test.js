describe('Sandbox', () => {

  const Sandbox = opr.Toolkit.Sandbox;

  describe('create context', () => {

    it('returns a context containing own methods', () => {

      // given
      const SomeComponent = class extends opr.Toolkit.Component {
        a() {
          return this;
        }
        b() {
          return 'b';
        }
      }
      const instance = new SomeComponent();

      // when
      const context = Sandbox.create(instance);

      // then
      assert.equal(typeof context, 'object');
      assert.equal(context.a, context.a);
      assert.equal(context.a(), context);
      assert.equal(context.b(), 'b');
    })

    it('returns a context containing inherited methods', () => {

      // given
      const ParentComponent = class extends opr.Toolkit.Component {
        a() {
          return this;
        }
        b() {
          return 666;
        }
      }

      const SomeComponent = class extends ParentComponent {
        c() {
          return 'c';
        }
      };
      const instance = new SomeComponent();

      // when
      const context = Sandbox.create(instance);

      // then
      assert.equal(typeof context, 'object');
      assert.equal(context.a, context.a);
      assert.equal(context.a(), context);
      assert.equal(context.b, context.b);
      assert.equal(context.b(), 666);
      assert.equal(context.c(), 'c');
    })

    it('does not return built-in component properties', () => {

      // given
      const instance = new opr.Toolkit.Component();

      // when
      const context = Sandbox.create(instance);

      // then
      assert.equal(context.constructor, undefined);
      assert.equal(context.appendChild, undefined);
      assert.equal(context.nodeType, undefined);
      assert.equal(context.onUpdated, undefined);
      assert.equal(context.unknown, undefined);
    })

    it('allows to set and get rendering-related properties', () => {

      // given
      const instance = new opr.Toolkit.Component();
      const props = {};
      const children = [];

      // when
      const context = Sandbox.create(instance);
      context.props = props;
      context.children = children;

      // then
      assert.equal(context.props, props);
      assert.equal(context.children, children);
    })
  });
});
